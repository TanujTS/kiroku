import type { Metadata } from "next";
import { Space_Grotesk, Nunito, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk'
})

const nunito = Nunito({
  variable: "--font-nunito"
})

const inter = Inter({
  variable: '--font-inter'
})

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
      <body
        className={`${spaceGrotesk.variable} ${nunito.variable} ${inter.variable} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
