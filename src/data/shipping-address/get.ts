import "server-only";

import { db } from "@/db";

export const getShippingAddressFromUserById = async (
  userId: string,
  shippingAddressId: string,
) => {
  const shippingAddress = await db.query.shippingAddressTable.findFirst({
    where: (shippingAddress, { eq, and }) =>
      and(
        eq(shippingAddress.id, shippingAddressId),
        eq(shippingAddress.userId, userId),
      ),
  });

  return shippingAddress;
};

export const getShippingAddressesFromUser = async (userId: string) => {
  const shippingAddresses = await db.query.shippingAddressTable.findMany({
    where: (shippingAddress, { eq }) => eq(shippingAddress.userId, userId),
  });

  return shippingAddresses;
};
