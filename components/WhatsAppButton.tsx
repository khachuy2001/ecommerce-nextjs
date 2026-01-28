"use client";

import Image from "next/image";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/84901234567"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
    >
      <div className="w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center hover:scale-110 transition">
        <Image
          src="/whatsapp.png"
          alt="Chat WhatsApp"
          width={36}
          height={36}
          priority
        />
      </div>
    </a>
  );
};

export default WhatsAppButton;
