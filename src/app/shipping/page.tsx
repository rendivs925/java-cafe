import { type ReactElement } from "react";

export interface pageProps {}

export default function page(props: pageProps): ReactElement {
  return (
    <section className="py-navbar">
      <div>
        <h1>Shipping</h1>
      </div>
    </section>
  );
}
