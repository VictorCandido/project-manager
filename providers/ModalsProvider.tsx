"use client";

import { useEffect, useState } from "react";
import NewAppointmentModal from "../components/Appointment/NewAppointmentModal";
import EditAppointmentModal from "@/components/Appointment/EditAppointmentModal";

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
        </>
    );
}
 
export default ModalsProvider;