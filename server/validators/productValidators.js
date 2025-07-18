import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3).max(200),
  description: z.string().min(10),
  price: z.coerce.number().positive(),
  stock: z.coerce.number().int().nonnegative(),
  categoryId: z.coerce.number().int(),
  image: z.string().url().optional(), //  make optional
  imagePublicId: z.string().optional(), //  for deletion during update
});



export const updateProductSchema = productSchema.partial()




