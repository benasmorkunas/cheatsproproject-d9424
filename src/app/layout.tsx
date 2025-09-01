import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "@/contexts/CartContext";
// Temporarily disabled to fix Jest worker issue:
// import KlaviyoProvider from "@/components/KlaviyoProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WooCommerce Store",
  description: "Modern e-commerce frontend built with Next.js and WooCommerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <CartProvider>
          {/* <KlaviyoProvider /> Temporarily disabled to fix Jest worker issue */}
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
