import { db } from "@/lib/db";
import AppointmentDay from "./AppointmentDay";
import { Profile } from "@prisma/client";

type AppointmentDataProps = {
    profile: Profile;
}

const AppointmentData = async ({ profile }: AppointmentDataProps) => {
    const appointments = await db.appointment.findMany({ 
        where: {
            profileId: profile.id
        },
        include: { customer: true },
        orderBy: { date: 'desc' },
    });

    return (
        <div>
            {appointments.length
            ? <AppointmentDay data={appointments}/>
            : 'Nenhum apontamento encontrado...'}
        </div>
    );
}
 
export default AppointmentData;