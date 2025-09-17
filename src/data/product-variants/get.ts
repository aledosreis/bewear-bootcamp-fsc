import "server-only";

import { db } from "@/db";

export const getProductVariantBySlug = async (slug: string) => {
  const productVariant = await db.query.productVariantTable.findFirst({
    where: (productVatiant, { eq }) => eq(productVatiant.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });

  return productVariant;
};

export const getProductVariantById = async (variantId: string) => {
  const productVariant = await db.query.productVariantTable.findFirst({
    where: (productVariant, { eq }) => eq(productVariant.id, variantId),
  });

  return productVariant;
};
