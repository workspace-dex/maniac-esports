import type { Metadata } from "next";
import "./globals.css";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Maniac Esports",
    template: "%s | Maniac Esports",
  },
  description:
    "India's community-first esports club connecting creators, community and sponsor-ready gaming campaigns.",
  keywords: [
    "Maniac Esports",
    "esports India",
    "gaming creators",
    "brand activations",
    "gaming community",
  ],
  applicationName: "Maniac Esports",
  openGraph: {
    title: "Maniac Esports",
    description:
      "India's community-first esports club connecting creators, community and sponsor-ready gaming campaigns.",
    siteName: "Maniac Esports",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maniac Esports",
    description:
      "India's community-first esports club connecting creators, community and sponsor-ready gaming campaigns.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-canvas font-sans text-white antialiased">{children}</body>
    </html>
  );
}
