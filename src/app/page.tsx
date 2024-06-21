import type { Metadata } from "next";
import { About, Blog, Contact, Footer, Hero, Products } from "@/sections";

export const metadata: Metadata = {
  title: "Home",
  description: "This is the home page of coffee shop website",
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
