import NoAccess from '@/components/NoAccess';
import WistListProducts from '@/components/WistListProducts';
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

const WistListPage = async () => {
  const user = await currentUser();
  return (
    <>
      {user ? <WistListProducts /> : <NoAccess details='Log in to view your wishlist items. Don’t miss out on your cart products to make the payment!' />}
    </>
  )
}

export default WistListPage
