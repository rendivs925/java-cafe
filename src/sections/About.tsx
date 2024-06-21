import Image from "next/image";
import { type ReactElement } from "react";

export interface AboutProps {}

export default function About(props: AboutProps): ReactElement {
  return (
    <section>
      <div className="container grid gap-7xl lg:grid-cols-about lg:items-center">
        <div className="relative aspect-square rounded-lg shadow">
          <Image
            src="/images/cafe.png"
            alt="Cafe"
            objectFit="cover"
            layout="fill"
            className="rounded-lg"
          />
        </div>
        <div>
          <h2>About Us</h2>
          <p className="text-spacing">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
            provident earum obcaecati! Itaque excepturi, doloribus qui fugit
            voluptates neque dignissimos debitis, omnis laudantium cupiditate
            modi vero, corporis similique repellendus natus!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
            reprehenderit, illum deserunt ut non possimus dolorum consectetur at
            veritatis, corrupti assumenda enim sunt, similique debitis modi
            magni fuga totam culpa.
          </p>
        </div>
      </div>
    </section>
  );
}
