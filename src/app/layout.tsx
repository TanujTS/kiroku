import type { Metadata } from "next";
import { Lora, Space_Grotesk, Unbounded } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Suspense } from "react";
import { UrlToast } from "@/components/url-toast";

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

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["400", "500", "600", "700"],
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
    <html lang="en" className={`${unbounded.variable} ${spaceGrotesk.variable} ${lora.variable}`}>
      <body className={`antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
          <Suspense fallback={null}>
            <UrlToast />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
