import { AppointmentCustormerProps } from "@/types/AppointmentCustormerProps";
import AppointmentCard from "./AppointmentCard";

interface AppointmentDayProps {
    data: AppointmentCustormerProps[]
}

const AppointmentDay = ({ data }: AppointmentDayProps) => {
    return (
        <>

            {data.map((appointment, index) => (
                <>
                    <h2 className="text-xl font-bold">
                        {new Date(appointment.date)
                            .toLocaleDateString('pt-BR', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}
                    </h2>

                    <AppointmentCard 
                        key={index}
                        data={appointment}
                    />
                </>

            ))}
        </>
    );
}
 
export default AppointmentDay;