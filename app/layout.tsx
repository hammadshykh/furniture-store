import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: {
    default: "Premium Furniture Store | AI-Powered Shopping",
    template: "%s | Premium Furniture Store",
  },
  description:
    "Discover premium furniture with our AI shopping assistant. Browse sofas, tables, chairs, and more. Personalized recommendations and seamless checkout experience.",
  keywords: [
    "furniture",
    "premium furniture",
    "online furniture store",
    "sofas",
    "tables",
    "chairs",
    "AI shopping assistant",
    "home decor",
  ],
  authors: [{ name: "Premium Furniture Store" }],
  creator: "Premium Furniture Store",
  publisher: "Premium Furniture Store",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Premium Furniture Store | AI-Powered Shopping",
    description:
      "Discover premium furniture with our AI shopping assistant. Browse sofas, tables, chairs, and more.",
    siteName: "Premium Furniture Store",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Premium Furniture Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Furniture Store | AI-Powered Shopping",
    description:
      "Discover premium furniture with our AI shopping assistant. Browse sofas, tables, chairs, and more.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "any" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
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
      >
        {children}
      </body>
    </html>
  );
}
