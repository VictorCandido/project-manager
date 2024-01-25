import { Appointment, Customer } from "@prisma/client";

export type AppointmentCustomerProps = Appointment & { customer: Customer };

