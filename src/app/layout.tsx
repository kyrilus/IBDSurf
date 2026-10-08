import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "./globals.css";

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
      className="h-full antialiased"
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
