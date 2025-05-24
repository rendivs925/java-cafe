import BaseContainer from "@/components/BaseContainer";
import ProductCatalog from "@/components/ProductCatalog";
import { IProduct } from "@/models/Product";
import BaseContent from "@/components/BaseContent";
import BaseHeader from "@/components/BaseHeader";
import Image from "next/image";
import { getProductByIdAction } from "@/actions/getProductByIdAction";
import { formatToRupiah } from "@/lib/formatToRupiah";
import { FaStar } from "react-icons/fa";
import AddProductToCartButton from "@/components/AddProductToCartButton";

export default async function Page(props: {
  params: Promise<{ productId: string }>;
}) {
  const params = await props.params;
  const { productId } = params;
  const response = await getProductByIdAction(productId);
  const data = response.item;

  console.log(data);

  if (!data) {
    return <div>Error: Product not found.</div>;
  }

  // Helper function to render stars based on the rating value
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span className="text-xl">
          <FaStar
            key={i}
            className={`text-yellow-500 ${i <= rating ? "" : "text-secondary"}`}
          />
        </span>,
      );
    }
    return stars;
  };

  return (
    <BaseContainer>
      <BaseContent className="grid gap-10 max-md:grid-cols-1 grid-cols-detail max-w-none mx-auto">
        <div className="relative w-full overflow-hidden rounded-lg">
          <Image
            src={data.imgUrl}
            alt={data.title}
            width={0}
            height={0}
            className="aspect-square"
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            objectFit="cover"
          />
        </div>
        <div>
          <h1>{data.title}</h1>

          {/* Render rating stars only if rating > 0 */}
          {data?.rating && (
            <div className="flex items-center mt-6">
              {renderStars(data.rating)}
              <span className="ml-2 text-muted-foreground">
                {data.rating} / 5 by {data?.reviews.length} customers
              </span>
            </div>
          )}

          <h3 className="mt-6">{formatToRupiah(data.price)}</h3>
          <p className="max-w-[50ch]">{data.description}</p>
          <div className="my-6 space-y-1.5">
            <p className="my-0">Category : {data.category}</p>
            <p className="my-0">Stock : {data.stock}</p>
          </div>
          <div>
            <AddProductToCartButton product={data} />
          </div>
        </div>
      </BaseContent>
      <div className="w-full">
        <BaseHeader className="pt-12" title="Our Products" />
        <BaseContent>
          <ProductCatalog />
        </BaseContent>
      </div>
    </BaseContainer>
  );
}
