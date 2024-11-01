import Title from "@/components/Title";
import ProductsList from "@/components/ProductsList";

export default function Products() {
  return (
    <section id="products">
      <div className="container">
        <Title
          title="Our Products"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
                       dolor sit amet consectetur adipisicing elit. Corporis"
        />
        <ProductsList />
      </div>
    </section>
  );
}
