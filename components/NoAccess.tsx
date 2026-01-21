import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SignInButton } from '@clerk/nextjs'
import React from 'react'

const NoAccess = ({ details = "Login in to view your cart items and checkout. Don't miss out on your favorite products" }: { details?: string }) => {
  return (
    <div className='flex items-center justify-center py-12 md:py-32 bg-gray-100 p-4'>
      <Card className='w-full max-w-md p-5'>
        <CardHeader className='flex items-center flex-col'>
          <Logo />
          <CardTitle className='text-2xl font-bold text-center'>Welcome Back</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <p className='text-center font-medium text-darkColor/80'>{details}</p>
          <SignInButton mode='modal'>
            <Button className='w-full' size="lg">Login</Button>
          </SignInButton>
        </CardContent>
      </Card>
    </div >
  )
}

export default NoAccess
