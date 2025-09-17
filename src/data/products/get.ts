import "server-only";

import { db } from "@/db";

// interface ProductDto {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   category: string;
//   createdAt: Date;
// }

export const getProductsWithVariants = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });

  return products;
};

export const getNewlyCreatedProducts = async () => {
  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: (product, { desc }) => [desc(product.createdAt)],
    with: {
      variants: true,
    },
  });

  return newlyCreatedProducts;
};

export const getProductsFromCategory = async (categoryId: string) => {
  const products = await db.query.productTable.findMany({
    where: (product, { eq }) => eq(product.categoryId, categoryId),
    with: {
      variants: true,
    },
  });

  return products;
};
