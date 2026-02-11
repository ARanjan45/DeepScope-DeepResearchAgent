import type { Metadata } from "next";
import { Dancing_Script, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DeepScope - AI-Powered Research Assistant",
  description: "Dive deep into any topic with AI-powered research. Get comprehensive, well-sourced reports in minutes.",
  keywords: ["AI research", "deep research", "research assistant", "AI reports", "automated research"],
  icons: {
    icon: [
      { url: '/logo.svg' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${dancingScript.variable} font-inter antialiased`}
      >
        {children}
      </body>
    </html>
  );
}