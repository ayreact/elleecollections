import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import MobileNavMenu from "@/components/MobileNavMenu";
import ProductModal from "@/components/ProductModal";
import WhatsAppLoadingOverlay from "@/components/WhatsAppLoadingOverlay";
import Toast from "@/components/Toast";
import StoreInitializer from "@/components/StoreInitializer";
import SearchOverlay from "@/components/SearchOverlay";
import { getCategories } from "@/lib/api";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Ellee Collections — Trendy. Affordable. Always You.",
  description:
    "Discover luxury gift boxes, pearl earrings, and silk scarves — curated pieces that speak to your style. Delivered to your doorstep with seamless guest checkout.",
  openGraph: {
    title: "Ellee Collections",
    description: "Discover luxury gift boxes, pearl earrings, and silk scarves — curated pieces that speak to your style. Delivered to your doorstep with seamless guest checkout.",
    url: "https://elleecollections.vercel.app",
    siteName: "Ellee Collections",
    images: [
      {
        url: "https://ogimage.io/templates/brand?title=Ellee+Collections&subtitle=Trendy.+Affordable.+Always+You.&color=032F25&font=playfair-display",
        width: 1200,
        height: 630,
        alt: "Ellee Collections",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ellee Collections",
    description: "Discover luxury gift boxes, pearl earrings, and silk scarves — curated pieces that speak to your style. Delivered to your doorstep with seamless guest checkout.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const categories = await getCategories();

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-[#faf8f5] text-stone-800 font-sans antialiased selection:bg-emerald-900 selection:text-amber-100">
        <StoreInitializer categories={categories} />
        <div className="w-full max-w-[440px] min-h-screen mx-auto bg-[#faf8f5] relative flex flex-col border-x border-stone-200/80 overflow-x-hidden shadow-2xl">
          <Header />
          <main className="flex-1">{children}</main>
        </div>

        <CartDrawer />
        <MobileNavMenu />
        <SearchOverlay />
        <ProductModal />
        <WhatsAppLoadingOverlay />
        <Toast />
      </body>
    </html>
  );
}
