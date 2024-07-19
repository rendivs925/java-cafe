import type { Metadata } from "next";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Products from "@/sections/Products";
import Blog from "@/sections/Blog";
import Footer from "@/sections/Footer";
import Contact from "@/sections/Contact";

export const metadata: Metadata = {
  title: "Home",
  description: "This is the home page of Java Cafe website",
};

console.log("Hi there from tes branch!");

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
