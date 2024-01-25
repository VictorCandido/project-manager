import { z } from "zod";

export const AppointmentSchema = z.object({
    customer: z.string().min(1, 'Informe o cliente.'),
    date: z.date(),
    start: z.string().min(1, 'Informe a hora de início.'),
    end: z.string().min(1, 'Informe a hora de fim.'),
    description: z.string().min(1, 'Informe a descrição.'),
});

export type AppointmentSchemaType = z.infer<typeof AppointmentSchema>;