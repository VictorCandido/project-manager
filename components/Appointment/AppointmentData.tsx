"use client";

import { GroupedAppointmentCustomerProps } from "@/types/GroupedAppointmentCustomerProps";
import AppointmentDay from "./AppointmentDay";
import { useFilterAppointment } from "@/hooks/useFilterAppointmentStore";

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