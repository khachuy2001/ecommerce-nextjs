"use client"

import OrderDetailDialog from "@/components/OrderDetailDialog"
import PriceFormatter from "@/components/PriceFormatter"
import { TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { MY_ORDERS_QUERY_RESULT, Order } from "@/sanity.types"

import { format } from "date-fns"
import { X } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"

const OrdersComponent = ({ orders }: { orders: MY_ORDERS_QUERY_RESULT }) => {
    const [selectedOrder, setSelectedOrder] = useState<MY_ORDERS_QUERY_RESULT[number] | null>(null);
    const handleOrderClick = (order: MY_ORDERS_QUERY_RESULT[number]) => {
        setSelectedOrder(order);
    }
    const handleDelete = () => {
        toast.error("Bạn không có quyền xóa. Chỉ quản trị viên mới được phép.");
    }
    return (
        <>
            <TableBody>
                <TooltipProvider>
                    {orders?.map((order) => (
                        <Tooltip key={order?.orderNumber}>
                            <TooltipTrigger asChild>
                                <TableRow
                                    className="cursor-pointer hover:bg-gray-100 h-1..."
                                    onClick={() => setSelectedOrder(order)}
                                >
                                    <TableCell className="font-medium">
                                        {order.orderNumber?.slice(-10) ?? "N/A"}...
                                    </TableCell>
                                    <TableCell>
                                        {order.customerName}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {"orderDate" in order &&
                                            format(new Date(order.orderDate as string), "dd/MM/yyyy")}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {order.email}
                                    </TableCell>
                                    <TableCell>
                                        <PriceFormatter amount={order?.totalPrice} className="text-black font-medium" />
                                    </TableCell>
                                    <TableCell>
                                        {order?.status && (
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-semibold ${order.status === "paid"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-yellow-100 text-yellow-800"
                                                    }`}
                                            >
                                                {order?.status.charAt(0).toUpperCase() + order?.status.slice(1)}
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        {order?.invoice && (
                                            <p className="font-medium line-clamp-1">
                                                {order?.invoice ? order?.invoice?.number : "----"}
                                            </p>
                                        )}
                                    </TableCell>
                                    <TableCell
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            handleDelete();
                                        }}
                                        className="flex items-center justify-center group"
                                    >
                                        <X
                                            size={20}
                                            className="group-hover:text-shop_dark_green hoverEffect"
                                        />
                                    </TableCell>
                                </TableRow>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Click to see order details</p>
                            </TooltipContent>
                        </Tooltip>
                    ))}
                </TooltipProvider>
            </TableBody>
            <OrderDetailDialog order={selectedOrder} isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} />
        </>
    )
}

export default OrdersComponent
