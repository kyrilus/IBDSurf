import type { Metadata } from "next";
import { AdminContentRuntime } from "@/components/admin/AdminContentRuntime";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://ibdesigns.us"),
  title: {
    default: "Ian Blackmore Designs",
    template: "%s | Ian Blackmore Designs",
  },
  description:
    "Custom surfboards shaped by Ian Blackmore Designs with a focus on feel, speed, and lasting connection to the water.",
  openGraph: {
    type: "website",
    siteName: "Ian Blackmore Designs",
    title: "Ian Blackmore Designs",
    description: "Custom surfboards shaped by Ian Blackmore Designs.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ian Blackmore Designs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ian Blackmore Designs",
    description: "Custom surfboards shaped by Ian Blackmore Designs.",
    images: ["/og-image.jpg"],
  },
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
            __html: `document.documentElement.classList.add('dark')`,
          }}
        />
      </head>
      <body className="min-h-full bg-stone-50 text-stone-950 dark:bg-black dark:text-stone-50">
        <AdminContentRuntime />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
