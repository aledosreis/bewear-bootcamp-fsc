import z from "zod";

export const addProductToCartSchema = z.object({
  producVariantId: z.uuid(),
  quantity: z.number().min(1),
});

export type AddProductToCartSchema = z.infer<typeof addProductToCartSchema>;
