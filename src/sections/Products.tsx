import { type ReactElement } from "react";
import Title from "@/components/Title"
import ProductsList from "@/components/ProductsList"

export default function Products(): ReactElement {
  return (
    <section id="products">
      <div className="container">
        <Title
          title="Our Products"
          description="Lorem ipsum sit amet consectetur adipisicing elit. Corporisdolor sit amet consectetur adipisicing elit. Corporis"
        />
        <ProductsList />
      </div>
    </section>
  );
}
