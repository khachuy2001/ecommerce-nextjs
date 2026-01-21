
import CartIcon from "@/components/CartIcon";
import Container from "@/components/Container";
import FavoriteButton from "@/components/FavoriteButton";
import HeaderMenu from "@/components/HeaderMenu";
import Logo from "@/components/Logo";
import MobileMenu from "@/components/MobileMenu";
import SearchBar from "@/components/SearchBar";
import SignIn from "@/components/SignIn";
import { getMyOrders } from "@/sanity/queries";
import { ClerkLoaded, SignedIn, UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Logs } from "lucide-react";
import Link from "next/link";
import React from "react";

const Header = async () => {
  const user = await currentUser();
  const { userId } = await auth();
  let orders = null;
  if (userId) {
    orders = await getMyOrders(userId);
  }

  return (
    <header className="bg-white/70 py-5 sticky top-0 z-50 backdrop-blur-md">
      <Container className="flex items-center justify-between text-lightColor">
        <div className=" w-auto md:w-1/3 flex items-center gap-2.5 justify-start md:gap-0">
          <MobileMenu />
          <Logo />
        </div>
        <HeaderMenu />
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <SearchBar />
          <CartIcon />
          <FavoriteButton />
          <ClerkLoaded>
            <SignedIn>
              <Link
                href={"/orders"}
                className="group relative hover:text-shop_light_green hoverEffect"
              >
                <Logs />
                <span className="absolute -top-1 -right-1 bg-shop_btn_dark_green text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
                  {orders?.length ? orders?.length : 0}
                </span>
              </Link>
              <UserButton />
            </SignedIn>
            {!user && <SignIn />}
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
};

export default Header;
