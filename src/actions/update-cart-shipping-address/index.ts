"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { getCartFromUser } from "@/data/cart/get";
import { getShippingAddressFromUserById } from "@/data/shipping-address/get";
import { db } from "@/db";
import { cartTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import {
  UpdateCartShippingAddressSchema,
  updateCartShippingAddressSchema,
} from "./schema";

export const updateCartShippingAddress = async (
  data: UpdateCartShippingAddressSchema,
) => {
  updateCartShippingAddressSchema.parse(data);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized.");
  }

  const shippingAddress = await getShippingAddressFromUserById(
    session.user.id,
    data.shippingAddressId,
  );

  if (!shippingAddress) {
    throw new Error("Shipping address not found or unauthorized");
  }

  const cart = await getCartFromUser(session.user.id);

  if (!cart) {
    throw new Error("Cart not found");
  }

  await db
    .update(cartTable)
    .set({ shippingAddressId: data.shippingAddressId })
    .where(eq(cartTable.id, cart.id));

  return { success: true };
};
