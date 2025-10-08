import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { TankstackProvider } from "../../components/providers/tankstack-provider";
import Header from "../../components/ui/Header";
import { CartProvider } from "../../components/context/CartContext";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "E-commerce App",
  description: "Product listing page",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body className={`${poppins.className} font-poppins`}>
        <CartProvider>
          <Header />
          <TankstackProvider>
            <main>{children}</main>
          </TankstackProvider>
        </CartProvider>
      </body>
    </html>
  );
}
