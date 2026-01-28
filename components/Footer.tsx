import Container from "@/components/Container";
import FooterTop from "@/components/FooterTop";
import Logo from "@/components/Logo";
import SocialMedia from "@/components/SocialMedia";
import React from "react";
import { SubText, SubTitle } from "./ui/text";
import { categoriesData, quickLinksData } from "@/constants/data";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-white  border-t">
      <Container>
        <FooterTop />
        <div className="py-12  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <SubText>
              Khám phá các bộ sưu tập nội thất chọn lọc tại SmartVibe, sự kết hợp hoàn hảo giữa phong cách và sự tiện nghi để nâng tầm không gian sống của bạn.
            </SubText>
            <SocialMedia
              className="text-darkColor/60"
              iconClassName="border-darkColor/60 hover:border-shop_light_green hover:text-shop_light_green"
              tooltipClassName="bg-darkColor text-white"
            />
          </div>
          <div>
            <SubTitle>Liên kết nhanh</SubTitle>
            <ul className="space-y-3 mt-4">
              {quickLinksData?.map((item) => (
                <li key={item?.title}>
                  <Link
                    href={item?.href}
                    className="hover:text-shop_light_green hoverEffect font-medium"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SubTitle>Categories</SubTitle>
            <ul className="space-y-3 mt-4">
              {categoriesData?.map((item) => (
                <li key={item?.title}>
                  <Link
                    href={`/category/${item?.href}`}
                    className="hover:text-shop_light_green hoverEffect font-medium"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <SubTitle>Đăng ký nhận tin</SubTitle>
            <SubText>
              Đăng ký nhận tin bản tin của chúng tôi để cập nhật những thông tin mới nhất và các ưu đãi độc quyền.
            </SubText>
            <form className="space-y-3">
              <Input placeholder="Enter your email" type="email" required />
              <Button className="w-full">Đăng ký</Button>
            </form>
          </div>
        </div>
        <div className="border-t mt-6">
          <div className="py-4 text-center text-sm text-gray-500">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-gray-700">SMARTVIBE</span>. All
            rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
