"use client";

import Image from "next/image";

const MessengerButton = () => {
  return (
    <a
      href="https://m.me/YOUR_PAGE_ID"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-6 z-50"
    >
      <div className="w-12 h-12 rounded-full shadow-lg bg-white flex items-center justify-center hover:scale-110 transition">
        <Image
          src="/messenger.png"
          alt="Chat Messenger"
          width={36}
          height={36}
          priority
        />
      </div>
    </a>
  );
};

export default MessengerButton;
