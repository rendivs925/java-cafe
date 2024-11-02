import ProductCatalog from "@/components/ProductCatalog";
import BaseContainer from "@/components/BaseContainer";
import BaseHeader from "@/components/BaseHeader";
import BaseContent from "@/components/BaseContent";
// import { checkAndUpdateExpiredOrders } from "@/actions/checkAndUpdateExpiredOrders";

export default async function Products() {

  return (
    <BaseContainer>
      <BaseHeader title="Our Products" />
      <BaseContent>
        <ProductCatalog />
      </BaseContent>
    </BaseContainer>
  );
}
