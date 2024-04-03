
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import NextTopLoader from 'nextjs-toploader';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Direktori Alumni Universitas Djuanda",
  description: "Direktori Alumni Universitas Djuanda",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <NextTopLoader />
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <Navigation></Navigation>
        {children}
        <Footer></Footer>
        </ThemeProvider>
        </body>
    </html>
  );
}
