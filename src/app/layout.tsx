import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { TankstackProvider } from "../../components/providers/tankstack-provider";
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
      <body className={`m-24 ${poppins.className} font-poppins`}>
        <TankstackProvider> {children}</TankstackProvider>
      </body>
    </html>
  );
}
