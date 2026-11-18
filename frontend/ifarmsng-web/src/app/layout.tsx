import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "iFarmsNG | Growing Africa's Future",
  description:
    "iFarmsNG Agro Business Technology Ltd combines agricultural expertise, innovation and technology to create sustainable value across the agricultural value chain.",
  openGraph: {
    type: "website",
    title: "iFarmsNG | Growing Africa's Future",
    description: "Agriculture. Innovation. Opportunity. Everyone Eats.",
    siteName: "iFarmsNG Agro Business Technology Ltd",
  },
};

export const viewport: Viewport = { themeColor: "#123D2A" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
