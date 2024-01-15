import { AppointmentCustormerProps } from "@/types/AppointmentCustormerProps";
import AppointmentCard from "./AppointmentCard";

interface AppointmentDayProps {
    data: AppointmentCustormerProps[]
}

const AppointmentDay = ({ data }: AppointmentDayProps) => {
    return (
        <>
            {data.map((appointment, index) => (
                <div key={index}>
                    <h2 className="text-xl font-bold mb-4">
                        {new Date(appointment.date)
                            .toLocaleDateString('pt-BR', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}
                    </h2>

                    <AppointmentCard 
                        data={appointment}
                    />
                </div>
            ))}
        </>
    );
}
 
export default AppointmentDay;