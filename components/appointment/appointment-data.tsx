"use client";

import { GroupedAppointmentCustomerProps } from "@/types/grouped-appointment-customer-props";
import AppointmentDay from "./appointment-day";
import { useFilterAppointment } from "@/hooks/use-filter-appointment-store";

type AppointmentDataProps = {
    groupedAppointments: GroupedAppointmentCustomerProps[];
}

const AppointmentData = ({ groupedAppointments }: AppointmentDataProps) => {
    const { filterDate } = useFilterAppointment();

    return <AppointmentDay
        groupedAppointments={groupedAppointments}
        filterDate={filterDate}
    />;
}

export default AppointmentData;