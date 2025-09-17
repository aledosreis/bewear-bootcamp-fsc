import "server-only";

import { db } from "@/db";

export const getCartItemByCartIdAndProductVariantId = async (
  cartId: string,
  productVariantId: string,
) => {
  const cartItem = await db.query.cartItemTable.findFirst({
    where: (cartItem, { eq }) =>
      eq(cartItem.cartId, cartId) &&
      eq(cartItem.productVariantId, productVariantId),
  });

  return cartItem;
};

export const getCartItemById = async (cartItemId: string) => {
  const cartItem = await db.query.cartItemTable.findFirst({
    where: (cartItem, { eq }) => eq(cartItem.id, cartItemId),
    with: {
      cart: true,
    },
  });

  return cartItem;
};
