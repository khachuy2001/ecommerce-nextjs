import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import WhatsAppButton from "@/components/WhatsAppButton";
import MessengerButton from "@/components/MessengerButton";



export const metadata: Metadata = {
  title: "SmartVibe",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-center">
          <MessengerButton />
          <WhatsAppButton />
        </div>
        <Footer />
      </div>
    </ClerkProvider>
  );
}
