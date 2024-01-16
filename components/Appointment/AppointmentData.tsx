import { redirectToSignIn } from "@clerk/nextjs";

import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import AppointmentDay from "./AppointmentDay";

const AppointmentData = async () => {
    const profile = await currentProfile();

    if (!profile) {
        return redirectToSignIn();
    }
    
    const appointments = await db.appointment.findMany({ 
        where: {
            profileId: profile.id
        },
        include: { customer: true },
        orderBy: { date: 'desc' },
    });


    return (
        <div>
            {
                appointments.length
                ? <AppointmentDay data={appointments}/>
                : 'Nenhum apontamento encontrado...'
            }
        </div>
    );
}
 
export default AppointmentData;