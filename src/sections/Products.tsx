import Title from "@/components/Title";
import ProductsList from "@/components/ProductsList";
import { getProductsAction } from "@/actions/getProductsAction";

export default async function Products() {
  const products = await getProductsAction(1, 6);

  return (
    <section id="products">
      <div className="container">
        <Title
          title="Our Products"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
                       dolor sit amet consectetur adipisicing elit. Corporis"
        />
        <ProductsList products={products.items} />
      </div>
    </section>
  );
}
