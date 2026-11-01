import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AccessG | The Unbreakable Digital Pass",
  description:
    "Secure your spot at the most exclusive events in Lagos. Your digital pass saves directly to your device—guaranteeing instant entry at the gate, even if the network drops.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/branding/favicon.png", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: ["/branding/favicon.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-black" suppressHydrationWarning>
      <body 
        className="bg-black text-inverse-on-surface antialiased selection:bg-primary selection:text-on-primary-fixed"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
