import { AppointmentCustormerProps } from "@/types/AppointmentCustormerProps";
import AppointmentCard from "./AppointmentCard";

interface AppointmentDayProps {
    data: AppointmentCustormerProps[]
}

const AppointmentDay = ({ data }: AppointmentDayProps) => {
    return (
        <>
            <h2 className="text-xl font-bold">01 de janeiro de 2024</h2>

            {data.map((appointment, index) => (
                <AppointmentCard 
                    key={index}
                    data={appointment}
                />
            ))}
        </>
    );
}
 
export default AppointmentDay;