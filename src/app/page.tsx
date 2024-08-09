import type { Metadata } from "next";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Products from "@/sections/Products";
import Blog from "@/sections/Blog";
import Footer from "@/sections/Footer";
import Contact from "@/sections/Contact";
import { Author } from "next/dist/lib/metadata/types/metadata-types";

export const metadata: Metadata = {
  title: "Java Cafe | Homepage",
  description:
    "Welcome to Comfy Coffee Shop, your cozy corner for the finest coffee, delightful pastries, and a relaxing atmosphere. Visit us to enjoy freshly brewed coffee, free Wi-Fi, and a comfortable space to work or unwind. Located in the heart of the city, Comfy Coffee Shop is your go-to destination for a perfect coffee experience.",
  applicationName: "Coffee shop Web Application",
  bookmarks: "Java Cafe",
  authors: "Rendi Virgantara Setiawan" as Author,
  publisher: "Vercel",
  keywords: ["coffee shop", "java cafe", "coffee", "cafe"],
};

export default function Home() {
  return (
    <>
      <Hero />
      <div className="flex flex-col gap-[80px] lg:gap-[100px]">
        <About />
        <Products />
        <Blog />
        <Contact />
      </div>
      <Footer />
    </>
  );
}
