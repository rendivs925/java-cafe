"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AppProvider from "@/providers/AppProvider";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isDashboard = pathname.startsWith("/admin");

  return (
    <html lang="en" className="scroll-smooth scroll-pt-32">
      <body className={`${inter.className} ${isDashboard && "flex max-h-svh"}`}>
        {!isDashboard ? <Navbar /> : <Sidebar />}
        <div>
          <AppProvider>{children}</AppProvider>
        </div>
      </body>
    </html>
  );
}
