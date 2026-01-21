import Container from '@/components/Container';
import OrdersComponent from '@/components/OrdersComponent';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getMyOrders } from '@/sanity/queries';
import { auth } from '@clerk/nextjs/server'
import { Scrollbar } from '@radix-ui/react-scroll-area';
import { FileX } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const OrdersPage = async () => {
    const { userId } = await auth();
    if (!userId) {
        return redirect("/");
    }

    const orders = await getMyOrders(userId);
    return (
        <div>
            <Container className='py-10'>
                {orders?.length ? (
                    <Card className='w-full'>
                        <CardHeader>
                            <CardTitle>
                                Danh sách đơn hàng
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea >
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px] md:w-auto">Mã đơn hàng</TableHead>
                                            <TableHead className='hidden md:table-cell'>Ngày đặt</TableHead>
                                            <TableHead>Khách hàng</TableHead>
                                            <TableHead className='hidden md:table-cell'>Email</TableHead>
                                            <TableHead>Tổng tiền</TableHead>
                                            <TableHead>Trạng thái</TableHead>
                                            <TableHead>Số hoá đơn</TableHead>
                                            <TableHead>Thao tác</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <OrdersComponent orders={orders} />
                                </Table>
                                <Scrollbar orientation='horizontal' />
                            </ScrollArea>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="flex flex-col items-center justify-center py-10">
                        <FileX className="h-24 w-24 text-gray-400 mb-4" />
                        <h2 className="text-2xl font-semibold text-gray-900">
                            Chưa có đơn hàng nào
                        </h2>
                        <p className="mt-2 text-sm text-gray-600 text-center max-w-md">
                            Có vẻ như bạn chưa đặt đơn hàng nào. Hãy bắt đầu mua sắm để xem các đơn hàng của bạn tại đây!
                        </p>
                        <Button asChild className="mt-6">
                            <Link href="/">Bắt đầu mua sắm</Link>
                        </Button>
                    </div>
                )}
            </Container>
        </div>
    )
}

export default OrdersPage
