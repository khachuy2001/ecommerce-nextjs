import Link from "next/link";
import React from "react";
import Logo from "@/components/Logo"; // Giả định dựa trên hình ảnh

const NotFound = () => {
  return (
    <div className="bg-white flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-md w-full space-y-8">
        {/* Phần đầu: Logo và Thông báo chính */}
        <div className="text-center">
          <Logo />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Looking for something?
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We&apos;re sorry. The Web address you entered is not a functioning page on our site.
          </p>
        </div>

        {/* Phần thân: Các nút điều hướng chính */}
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <Link
              href="/"
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md text-white bg-shop_dark_green/80 hover:bg-shop_dark_green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amazonOrangeDark hoverEffect"
            >
              Go to SmartVibe&apos;s home page
            </Link>
            <Link
              href="/help"
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-semibold rounded-md text-amazonBlue bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amazonBlue"
            >
              Help
            </Link>
          </div>
        </div>

        {/* Phần cuối: Liên kết hỗ trợ bổ sung */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Need help? Visit the{" "}
            <Link href="/help" className="font-medium text-amazon-blue hover:text-amazon-blue-dark">
              Help section
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="font-medium text-amazon-blue hover:text-amazon-blue-dark">
              contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;