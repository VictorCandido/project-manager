"use client";

import { useEffect, useState } from "react";
import NewAppointmentModal from "../components/Appointment/NewAppointmentModal";
import EditAppointmentModal from "@/components/Appointment/EditAppointmentModal";
import DeleteAppointmentModal from "@/components/Appointment/DeleteAppointmentModal";

const ModalsProvider = () => {
    const [ isMounted, setIsMounted ] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }
    
    return (
        <>
            <NewAppointmentModal />
            <EditAppointmentModal />
            <DeleteAppointmentModal />
        </>
    );
}
 
export default ModalsProvider;