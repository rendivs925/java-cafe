import BaseContainer from "@/components/BaseContainer";
import BaseContent from "@/components/BaseContent";
import Image from "next/image";
import { getProductByIdAction } from "@/actions/getProductByIdAction";

export default async function Page({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = params;
  const response = await getProductByIdAction(productId);
  const data = response.item;

  if (!data) {
    return <div>Error: Product not found.</div>;
  }

  return (
    <BaseContainer>
      <BaseContent className="container grid gap-10 grid-cols-2 max-w-none mx-auto">
        <div className="relative w-full overflow-hidden">
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
          <span>{data.category}</span>
          <h2 className="mb-10">{data.title}</h2>
          <p>{data.description}</p>
        </div>
      </BaseContent>
    </BaseContainer>
  );
}
