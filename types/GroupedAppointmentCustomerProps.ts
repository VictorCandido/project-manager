import { AppointmentCustomerProps } from "./AppointmentCustomerProps";

export type GroupedAppointmentCustomerProps = {
    date: Date;
    appointments: AppointmentCustomerProps[];
}