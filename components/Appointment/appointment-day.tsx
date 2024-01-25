import _, { filter } from 'lodash';

import { GroupedAppointmentCustomerProps } from "@/types/grouped-appointment-customer-props";
import AppointmentCard from './appointment-card';

interface AppointmentDayProps {
    groupedAppointments: GroupedAppointmentCustomerProps[];
    filterDate?: Date;
}

const AppointmentDay = async ({ groupedAppointments, filterDate }: AppointmentDayProps) => {
    if (filterDate) {
        groupedAppointments = groupedAppointments.filter((groupedAppointment) => String(groupedAppointment.date) === String(filterDate));
    }

    return (
        <>
            {groupedAppointments.length
                ? groupedAppointments.map((groupedAppointments, index) => (
                    <div key={index} className="mt-4">
                        <h2 className="text-2xl font-bold">
                            {new Date(groupedAppointments.date)
                                .toLocaleDateString('pt-BR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                        </h2>

                        {groupedAppointments.appointments.map((appointment) => (
                            <AppointmentCard
                                key={appointment.id}
                                data={appointment}
                            />
                        ))}
                    </div>
                ))
                : 'Nenhum apontamento encontrado...'}
        </>
    );
}

export default AppointmentDay;