"use client";

import { useEffect, useState } from "react";
import NewAppointmentModal from "../components/Appointment/NewAppointmentModal";

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
        </>
    );
}
 
export default ModalsProvider;