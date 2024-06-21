import { ProductsList, Title } from "@/components";
import { type ReactElement } from "react";
export interface ProductsProps {}

export default function Products(props: ProductsProps): ReactElement {
  return (
    <section>
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
