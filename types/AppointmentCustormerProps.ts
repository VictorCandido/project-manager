import { Appointment, Customer } from "@prisma/client";

export type AppointmentCustormerProps = Appointment & { customer: Customer };