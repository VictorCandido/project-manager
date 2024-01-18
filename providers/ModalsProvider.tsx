"use client";

import { useEffect, useState } from "react";
import NewAppointmentModal from "../components/Appointment/modal/NewAppointmentModal";
import EditAppointmentModal from "@/components/Appointment/modal/EditAppointmentModal";
import DeleteAppointmentModal from "@/components/Appointment/modal/DeleteAppointmentModal";

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