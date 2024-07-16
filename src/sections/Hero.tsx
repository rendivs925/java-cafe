"use client";

import { type ReactElement } from "react";
import Image from "next/legacy/image";
import { Button } from "@/components/ui/button";

export interface HeroProps {}

export default function Hero(props: HeroProps): ReactElement {
  return (
    <section id="hero">
      <div className="container grid min-h-svh content-center lg:grid-cols-hero gap-6 lg:gap-20">
        <div className="justify-self-center max-smallerMobileScreen:w-[250px] max-smallerMobileScreen:h-[250px] max-[380px]:w-[0] max-[380px]:h-[0] lg:justify-self-end lg:order-2 w-[320px] h-[320px] lg:w-[350px] lg:h-[350px] xl:h-[480px] xl:w-[480px] relative">
          <Image
            src="/images/optimized-coffee-hd.png"
            alt="Coffee"
            priority
            layout="fill"
            loading="eager"
          />
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
          <Button size="lg" className="mt-12" variant="default">
            Order Now
          </Button>
        </div>
      </div>
    </section>
  );
}
