import Image from "next/image";
import { notFound } from "next/navigation";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { getProductsFromCategory } from "@/data/products/get";
import { getProductVariantBySlug } from "@/data/product-variants/get";
import { formatCentsToBRL } from "@/helpers/money";

import ProductActions from "./components/product-actions";
import VariantSelector from "./components/variant-selector";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;
  const productVariant = await getProductVariantBySlug(slug);

  if (!productVariant) {
    return notFound();
  }

  const likelyProducts = await getProductsFromCategory(
    productVariant.product.categoryId,
  );

  return (
    <>
      <Header />
      <div className="flex flex-col space-y-6">
        <Image
          src={productVariant.imageUrl}
          alt={productVariant.name}
          sizes="100vw"
          width={0}
          height={0}
          className="h-auto w-full object-cover"
        />

        <div className="px-5">
          <VariantSelector
            variants={productVariant.product.variants}
            selectedVariantSlug={productVariant.slug}
          />
        </div>

        <div className="px-5">
          <h2 className="text-lg font-semibold">
            {productVariant.product.name}
          </h2>
          <h3 className="text-muted-foreground text-sm">
            {productVariant.name}
          </h3>
          <h3 className="text-lg font-semibold">
            {formatCentsToBRL(productVariant.priceInCents)}
          </h3>
        </div>

        <ProductActions productVariantId={productVariant.id} />

        <div className="px-5">
          <p className="text-sm">{productVariant.product.description}</p>
        </div>

        <ProductList
          title="Você também pode gostar"
          products={likelyProducts}
        />

        <Footer />
      </div>
    </>
  );
};

export default ProductVariantPage;
