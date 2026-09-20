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
  metadataBase: new URL("https://elleecollections.vercel.app"),
  title: "Ellee Collections — Trendy. Affordable. Always You.",
  description:
    "Discover luxury gift boxes, pearl earrings, and silk scarves — curated pieces that speak to your style. Delivered to your doorstep with seamless guest checkout.",
  authors: [{ name: "Uchendu Kelechi Emmanuella" }],
  creator: "Uchendu Kelechi Emmanuella",
  keywords: ["luxury gift boxes", "pearl earrings", "silk scarves", "Ellee Collections", "fashion accessories", "Nigeria"],
  alternates: {
    canonical: "https://elleecollections.vercel.app",
  },
  openGraph: {
    title: "Ellee Collections",
    description: "Discover luxury gift boxes, pearl earrings, and silk scarves — curated pieces that speak to your style. Delivered to your doorstep with seamless guest checkout.",
    url: "https://elleecollections.vercel.app",
    siteName: "Ellee Collections",
    images: [
      {
        url: "/og-image.png",
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
    images: ["/og-image.png"],
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ellee Collections",
    url: "https://elleecollections.vercel.app/",
    author: {
      "@type": "Person",
      name: "Uchendu Kelechi Emmanuella"
    },
    publisher: {
      "@type": "Organization",
      name: "Ellee Collections",
      logo: {
        "@type": "ImageObject",
        url: "https://elleecollections.vercel.app/og-image.png"
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+2348123757600",
        contactType: "customer service",
        email: "uchendukelechi20@gmail.com"
      },
      sameAs: [
        "https://www.tiktok.com/@shopelleecollections01"
      ]
    }
  };

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} h-full`}
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
