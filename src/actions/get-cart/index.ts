"use server";

import { headers } from "next/headers";

import { getCartWithItemsFromUser } from "@/data/cart/get";
import { db } from "@/db";
import { cartTable } from "@/db/schema";
import { auth } from "@/lib/auth";

export const getCart = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const cart = await getCartWithItemsFromUser(session.user.id);

  if (!cart) {
    const [newCart] = await db
      .insert(cartTable)
      .values({
        userId: session.user.id,
      })
      .returning();

    return {
      ...newCart,
      items: [],
      totalPriceInCents: 0,
      shippingAddress: null,
    };
  }

  return {
    ...cart,
    totalPriceInCents: cart.items.reduce(
      (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
      0,
    ),
  };
};
