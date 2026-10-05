import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
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
    default: "Ian Blackmore Designs",
    template: "%s | Ian Blackmore Designs",
  },
  description:
    "Custom surfboards shaped by Ian Blackmore Designs, built as a premium Next.js storefront ready for Shopify commerce.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var theme;try{theme=localStorage.getItem('ibd-theme')}catch(e){}document.documentElement.classList.toggle('dark',theme==='dark'||(theme!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches))})()`,
          }}
        />
      </head>
      <body className="min-h-full bg-stone-50 text-stone-950 dark:bg-black dark:text-stone-50">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
