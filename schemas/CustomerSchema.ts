import { z } from "zod";

export const customerSchema = z.object({
    name: z.string().min(1, 'Informe o nome'),
    imageUrl: z.string().optional()
});

export type CustomerSchemaType = z.infer<typeof customerSchema>;