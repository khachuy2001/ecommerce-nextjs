"use server";

import { Address } from "@/sanity.types";
import { CartItem } from "@/store";
import stripe from "@/lib/stripe";
import { urlFor } from "@/sanity/lib/image";

export interface Metadata {
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    clerkUserId?: string;
    address?: Address | null;
}
export interface GroupedCartItems {
    product: CartItem["product"];
    quantity: number
}


export async function createCheckoutSession(
    items: GroupedCartItems[],
    metadata: Metadata
) {
    try {
        if (!items || items.length === 0) {
            throw new Error("Cart is empty");
        }

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        if (!baseUrl?.startsWith("http")) {
            throw new Error("NEXT_PUBLIC_BASE_URL is invalid");
        }

        const customers = await stripe.customers.list({
            email: metadata.customerEmail,
            limit: 1,
        });

        const customerId =
            customers.data.length > 0 ? customers.data[0].id : undefined;

        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            customer_email: customerId ? undefined : metadata.customerEmail,
            metadata: {
                orderNumber: metadata.orderNumber,
                customerName: metadata.customerName,
                customerEmail: metadata.customerEmail,
                ...(metadata.clerkUserId && { clerkUserId: metadata.clerkUserId }),
                address: metadata.address ? JSON.stringify(metadata.address) : "",
            },
            mode: "payment",
            allow_promotion_codes: true,
            payment_method_types: ["card"],
            invoice_creation: { enabled: true },
            success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
            cancel_url: `${baseUrl}/cart`,
            line_items: items.map((item) => {
                const price = item.product?.price;
                if (price == null) {
                    throw new Error("Invalid product price");
                }

                return {
                    quantity: item.quantity,
                    price_data: {
                        currency: "VND",
                        unit_amount: Math.round(price),
                        product_data: {
                            name: item.product?.name ?? "Unknown Product",
                            description: item.product?.description,
                            metadata: { id: item.product?._id },
                            images: item.product?.images?.length
                                ? [urlFor(item.product.images[0]).url()]
                                : undefined,
                        },
                    },
                };
            }),
        });

        return session.url;
    } catch (error) {
        console.error("Error creating Checkout Session", error);
        throw error;
    }
}