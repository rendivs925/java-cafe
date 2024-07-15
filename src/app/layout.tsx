"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AppProvider from "@/providers/AppProvider";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const el = useRef<HTMLHtmlElement>(null);

  useEffect(() => {
    if (el.current) {
      // Fade out the page content when the route changes
      gsap.to(el.current, { opacity: 0, duration: 0.2 });

      // Create a timeline for route change
      const timeline = gsap.timeline({
        onComplete: () => {
          // Fade in the page content after the route change
          gsap.to(el.current, { opacity: 1, duration: 0.2 });
        },
      });

      timeline.to(el.current, { opacity: 0, duration: 0.2 }); // Fade out

      return () => {
        // Clean up GSAP animations on unmount
        timeline.kill();
      };
    }
  }, [pathname]);

  const isDashboard = pathname.startsWith("/admin");

  return (
    <html ref={el} lang="en" className="scroll-smooth scroll-pt-32">
      <body className={`${inter.className} ${isDashboard && "flex max-h-svh"}`}>
        {!isDashboard ? <Navbar /> : <Sidebar />}
        <div>
          <AppProvider>{children}</AppProvider>
        </div>
      </body>
    </html>
  );
}
