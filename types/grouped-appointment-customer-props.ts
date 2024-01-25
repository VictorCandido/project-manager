import { AppointmentCustomerProps } from "./appointment-customer-props";

export type GroupedAppointmentCustomerProps = {
    date: Date;
    appointments: AppointmentCustomerProps[];
}