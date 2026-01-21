import "./globals.css";
import { Toaster } from 'react-hot-toast'
import { LoadingProvider } from "@/context/LoadingContext";
import GlobalLoadingOverlay from "@/components/GlobalLoadingOverlay";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="font-poppins antialiased">
        <LoadingProvider>
          <GlobalLoadingOverlay />
          {children}
          <Toaster position="bottom-right" toastOptions={{
            style: {
              backgroundColor: "#000000",
              color: "#fff"
            }
          }} />
        </LoadingProvider>
      </body>
    </html>
  );
};

export default RootLayout;