import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AccessG | Dual-Engine Event Ticketing & Pass Retrieval",
  description: "Instant offline-ready digital passes and real-time event gate scanning.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-surface text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-fixed">
        {children}
      </body>
    </html>
  );
}
