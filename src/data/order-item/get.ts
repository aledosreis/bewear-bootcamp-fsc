import "server-only";

import { db } from "@/db";

export const getOrderItemsByOrderId = async (orderId: string) => {
  const orderItems = await db.query.orderItemTable.findMany({
    where: (orderItem, { eq }) => eq(orderItem.orderId, orderId),
    with: {
      productVariant: { with: { product: true } },
    },
  });

  return orderItems;
};
