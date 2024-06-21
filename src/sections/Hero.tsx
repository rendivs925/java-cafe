"use client";

import Button from "@/components/Button";
import { type ReactElement } from "react";
import Image from "next/image";

export interface HeroProps {}

export default function Hero(props: HeroProps): ReactElement {
  const handleClick = () => {
    console.log("Hello world");
  };

  return (
    <section>
      <div className="container grid min-h-svh content-center lg:grid-cols-hero gap-xl lg:gap-7xl">
        <div className="justify-self-center max-smallerMobileScreen:w-[250px] max-smallerMobileScreen:h-[250px] max-[380px]:w-[0] max-[380px]:h-[0] lg:justify-self-end lg:order-2 w-[320px] h-[320px] lg:w-[350px] lg:h-[350px] xl:h-[480px] xl:w-[480px] relative">
          <Image src="/images/coffee-hd.png" alt="Coffee" layout="fill" />
        </div>
        <div className="lg:order-1 grid content-center justify-items-start">
          <h1>
            Keep your dreams <br /> alive with a cup <br /> of coffee
          </h1>
          <p className="max-w-[65ch]">
            Experience inspiration and our finest brew at Java Cafe. Fuel your
            journey with the warmth, aroma, and taste that keep your dreams
            alive.
          </p>
          <Button onClick={handleClick}>Order Now</Button>
        </div>
      </div>
    </section>
  );
}
