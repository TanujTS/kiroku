import type { Metadata } from "next";
import { Space_Grotesk, Unbounded } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  weight: ["300", "600", "500", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Kiroku",
  description: "where your story finds its breath",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${unbounded.variable} ${spaceGrotesk.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
