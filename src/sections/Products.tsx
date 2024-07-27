"use server";
import Title from "@/components/Title";
import ProductsList, { ProductType } from "@/components/ProductsList";
import { connectToDatabase } from "@/lib/dbConnect";
import Product from "@/models/Product";

async function getProducts() {
  try {
    await connectToDatabase();

    const products: ProductType[] = await Product.find({}).lean();
    console.log(products);

    return products;
  } catch (error) {
    return [];
  }
}

export default async function Products() {
  const products = await getProducts();

  return (
    <section id="products">
      <div className="container">
        <Title
          title="Our Products"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
                       dolor sit amet consectetur adipisicing elit. Corporis"
        />
        <ProductsList products={products} />
      </div>
    </section>
  );
}
