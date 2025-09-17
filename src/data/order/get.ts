import "server-only";

import { db } from "@/db";

export const getOrderById = async (orderId: string) => {
  const order = await db.query.orderTable.findFirst({
    where: (order, { eq }) => eq(order.id, orderId),
  });

  return order;
};

export const getOrdersFromUser = async (userId: string) => {
  const orders = await db.query.orderTable.findMany({
    where: (order, { eq }) => eq(order.userId, userId),
    with: {
      items: { with: { productVariant: { with: { product: true } } } },
    },
  });

  return orders;
};
