"use client";

import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
import NoAccess from "@/components/NoAccess";
import NoAccessToCart from "@/components/NoAccess";
import { Title } from "@/components/Title";
import { Address } from "@/sanity.types";
import useStore from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { ShoppingBag, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ProductSideMenu from "@/components/ProductSideMenu";
import toast from "react-hot-toast";
import PriceFormatter from "@/components/PriceFormatter";
import QuantityButtons from "@/components/QuantityButtons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { client } from "@/sanity/lib/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { createCheckoutSession, Metadata } from "@/actions/createCheckoutSession";

const CartPage = () => {
    const {
        deleteCartProduct,
        getTotalPrice,
        getItemCount,
        getSubTotalPrice,
        resetCart,
    } = useStore();

    const [isClient, setIsClient] = useState(false);
    const [loading, setLoading] = useState(false);
    const groupedItems = useStore((state) => state.getGroupedItems());
    const { isSignedIn } = useAuth();
    const { user } = useUser();
    const [addresses, setAddresses] = useState<Address[] | null>(null);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

    const fetchAddresses = async () => {
        setLoading(true);
        try {
            const query = `*[_type == "address"] | order(publishedAt desc)`;
            const data = await client.fetch(query);
            setAddresses(data);
            const defaultAddress = data.find((addr: Address) => addr.default);
            if (defaultAddress) {
                setSelectedAddress(defaultAddress);
            } else if (data.length > 0) {
                setSelectedAddress(data[0])
            }
        } catch (error) {
            console.log("Addresses fetching error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, [])
    const handleResetCart = () => {
        const confirmed = window.confirm("Are you sure you want to reset your cart?");
        if (confirmed) {
            resetCart();
            toast.success("Cart reset successfully!");
        }
    };
    const handleCheckout = async () => {
        setLoading(true);
        try {
            const metadata:Metadata = {
                orderNumber: crypto.randomUUID(),
                customerName: user?.fullName ?? "Unknown",
                customerEmail: user?.emailAddresses[0]?.emailAddress ?? "Unknown",
                clerkUserId: user?.id,
                address: selectedAddress,
            };
            const checkoutUrl = await createCheckoutSession(groupedItems, metadata);
            console.log(checkoutUrl)
                if (checkoutUrl) {
                    window.location.href = checkoutUrl;
                }
           
        } catch (error) {
            console.log("Error creating checkout session", error)
        } finally {
            setLoading(false)
        }
    }

    return <div className="bg-gray-50 pb-52 md:pb-10">
        {isSignedIn ? (
            <Container>
                {groupedItems?.length ? (
                    <>
                        <div className="flex items-center gap-2 py-5">
                            <ShoppingBag className="text-darkColor" />
                            <Title>Giỏ hàng</Title>
                        </div>
                        <div className="grid lg:grid-cols-3 md:gap-8">
                            <div className="lg:col-span-2 rounded-lg">
                                <div className="border bg-white rounded-md">
                                    {groupedItems?.map(({ product }) => {
                                        const itemCount = getItemCount(product?._id);
                                        return (
                                            <div
                                                key={product?._id}
                                                className="border-b p-2.5 last:border-b-0 flex items-center justify-between gap-5"
                                            >
                                                <div className="flex flex-1 items-start gap-2 h-28 md:h-44">
                                                    {product?.images && (
                                                        <Link href={`/product/${product?.slug?.current}`} className="border p-0.5 md:p-1 mr-2 rounded-md overflow-hidden group">
                                                            <Image
                                                                src={urlFor(product?.images[0]).url()}
                                                                alt="productImage"
                                                                width={500}
                                                                height={500}
                                                                loading="lazy"
                                                                className="w-32 md:w-40 h-32 md:h-40 object-cover group-hover:scale-105 hoverEffect"
                                                            />
                                                        </Link>
                                                    )}
                                                    <div className="h-full flex flex-1 flex-col justify-between py-1">
                                                        <div className="flex flex-col gap-0.5 md:gap-1.5">
                                                            <h2 className="text-base font-semibold line-clamp-1">{product.name}</h2>
                                                            <p className="text-sm capitalize">
                                                                Variant:<span className="font-semibold">{product.variant}</span>
                                                            </p>
                                                            <p className="text-sm capitalize">
                                                                Status: {""}
                                                                <span className="font-semibold">
                                                                    {product.status}
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger>
                                                                        <ProductSideMenu
                                                                            product={product}
                                                                            className="relative top-0 right-0"
                                                                        />
                                                                    </TooltipTrigger>
                                                                    <TooltipContent className="font-bold">
                                                                        Yêu thích
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                                <Tooltip>
                                                                    <TooltipTrigger>
                                                                        <Trash
                                                                            onClick={() => {
                                                                                deleteCartProduct(product?._id);
                                                                                toast.success("Xoá sản phẩm thành công");
                                                                            }}
                                                                            className="w-4 h-4 md:w-5 md:h-5 mr-1 text-gray-500 hover:text-red-600 hoverEffect"
                                                                        />
                                                                    </TooltipTrigger>
                                                                    <TooltipContent className="font-bold bg-red-600">
                                                                        Xoá khỏi giỏ hàng
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-start justify-between h-36 md:h-44 p-0.5 md:p-1">
                                                    <PriceFormatter
                                                        amount={
                                                            (product?.price as number) *
                                                            (1 - (product?.discount ?? 0) / 100) *
                                                            itemCount
                                                        }
                                                        className="font-bold text-lg"
                                                    />
                                                    <QuantityButtons product={product} />
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <Button
                                        onClick={handleResetCart}
                                        className="m-5 font-semibold"
                                        variant="destructive"
                                    >
                                        Reset Cart
                                    </Button>
                                </div>
                            </div>
                            <div className="lg:col-span-1">
                                <div className="hidden md:inline-block w-full bg-white p-6 rounded-lg border">
                                    <h2 className="text-xl font-semibold mb-4">Tóm tắt đơn hàng</h2>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span>Tạm tính</span>
                                            <PriceFormatter amount={getTotalPrice()} />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span>Giảm giá</span>
                                            <PriceFormatter amount={(getTotalPrice() - getSubTotalPrice())} />
                                        </div>
                                        <Separator />
                                        <div className="flex items-center justify-between font-bold text-lg">
                                            <span>Tổng tiền</span>
                                            <PriceFormatter amount={getSubTotalPrice()} className="text-lg font-bold text-black" />
                                        </div>
                                        <Button
                                            className="w-full rounded-full font-semibold tracking-wide hoverEffect"
                                            size="lg"
                                            disabled={loading}
                                            onClick={handleCheckout}
                                        >
                                            {loading ? "Please wait..." : "Tiến hành thanh toán"}
                                        </Button>
                                    </div>
                                </div>
                                <div>
                                    {addresses && (
                                        <div className="bg-white rounded-md mt-5">
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle>
                                                        Địa chỉ giao hàng
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <RadioGroup defaultValue={addresses?.find((addr) => addr.default)?._id.toString()}>
                                                        {addresses?.map((address) => (
                                                            <div
                                                                key={address?._id}
                                                                onClick={() => setSelectedAddress(address)}
                                                                className={`flex items-center space-x-2 mb-4 cursor-pointer ${selectedAddress?._id === address?._id && "text-shop_dark_green"}`}
                                                            >
                                                                <RadioGroupItem
                                                                    value={address?._id.toString()}
                                                                />
                                                                <Label htmlFor={`address-${address?._id}`}
                                                                    className="grid gap-1.5 flex-1"
                                                                >
                                                                    <span className="font-semibold">
                                                                        {address?.name}
                                                                    </span>
                                                                    <span className="text-sm text-black/60">
                                                                        {address.address}, {address.city}, {" "}
                                                                        {address.state} {address.zip}
                                                                    </span>
                                                                </Label>
                                                            </div>
                                                        ))}
                                                    </RadioGroup>
                                                    <Button variant="outline" className="w-full mt-4">Thêm địa chỉ</Button>
                                                </CardContent>
                                            </Card>
                                        </div>)}
                                </div>
                            </div>
                            {/* Mobile */}


                            {/* Mobile View - Order Summary Fixed at Bottom */}
                            <div className="md:hidden fixed bottom-0 left-0 w-full bg-white pt-2 border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                                <div className="bg-white p-4 rounded-lg border mx-4 mb-4">
                                    <h2 className="text-lg font-bold mb-4">
Tóm tắt đơn hàng</h2>

                                    <div className="space-y-4">
                                        {/* Subtotal Section */}
                                        <div className="flex items-center justify-between text-sm">
                                            <span>Tạm tính</span>
                                            <PriceFormatter amount={getTotalPrice()} />

                                        </div>

                                        {/* Discount Section */}
                                        <div className="flex items-center justify-between text-sm text-green-600">
                                            <span>Giảm giá</span>
                                            <PriceFormatter amount={(getTotalPrice() - getSubTotalPrice())} />
                                        </div>

                                        <hr />

                                        {/* Total Price Section */}
                                        <div className="flex items-center justify-between font-bold text-lg">
                                            <span>Tổng tiền</span>
                                            <PriceFormatter amount={getSubTotalPrice()} /> {/* */}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-col gap-2 pt-2">
                                            <Button
                                                className="w-full rounded-full font-semibold tracking-wide hoverEffect"
                                                size="lg"
                                                disabled={loading}
                                                onClick={handleCheckout}
                                            >
                                                {loading ? "Please wait..." : "Proceed to Checkout"}
                                            </Button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <EmptyCart />)}
            </Container>
        ) : (
            <NoAccess />)}

    </div >;
};

export default CartPage
