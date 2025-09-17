import "server-only";

import { db } from "@/db";

export const getCartFromUser = async (userId: string) => {
  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, userId),
  });

  return cart;
};

export const getCartWithItemsFromUser = async (userId: string) => {
  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, userId),
    with: {
      shippingAddress: true,
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });

  return cart;
};
