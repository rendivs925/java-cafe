"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AppProvider from "@/providers/AppProvider";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { CookiesProvider } from "react-cookie";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isDashboard = pathname.startsWith("/admin");

  return (
    <html lang="en" className="overflow-x-hidden scroll-smooth scroll-pt-32">
      <CookiesProvider>
        <AppProvider>
          <body
            className={`${inter.className} ${isDashboard && "flex max-h-svh"}`}
          >
            {!isDashboard ? <Navbar /> : <Sidebar />}
            <div className="w-full">{children}</div>
            <Toaster />
          </body>
        </AppProvider>
      </CookiesProvider>
    </html>
  );
}
