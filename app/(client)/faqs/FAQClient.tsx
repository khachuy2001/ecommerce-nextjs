"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "SmartVibe có phải là website chính thức không?",
    a: "SmartVibe là website thương mại điện tử phục vụ mục đích học tập."
  },
  {
    q: "Tôi cần tạo tài khoản để mua hàng không?",
    a: "Có. Bạn cần đăng nhập để đặt và theo dõi đơn hàng."
  },
  {
    q: "SmartVibe hỗ trợ thanh toán gì?",
    a: "Hiện tại hỗ trợ thanh toán online qua Stripe."
  },
  {
    q: "Tôi có thể đổi trả sản phẩm không?",
    a: "Có. Hỗ trợ đổi trả trong vòng 30 ngày."
  }
];

const FAQClient = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((item, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-md overflow-hidden"
        >
          <button
            onClick={() =>
              setOpenIndex(openIndex === index ? null : index)
            }
            className="w-full flex items-center justify-between p-4 text-left font-medium hover:bg-gray-50"
          >
            <span>{item.q}</span>
            <ChevronDown
              className={`transition-transform ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>

          {openIndex === index && (
            <div className="p-4 text-gray-600 border-t">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQClient;
