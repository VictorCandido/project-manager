"use client";

import { useEffect, useState } from "react";
import NewAppointmentModal from "../components/Appointment/modal/NewAppointmentModal";
import EditAppointmentModal from "@/components/Appointment/modal/EditAppointmentModal";
import DeleteAppointmentModal from "@/components/Appointment/modal/DeleteAppointmentModal";
import NewCustomerModal from "@/components/ControlPanel/customers/modal/NewCustomerModal";
import EditCustomerModal from "@/components/ControlPanel/customers/modal/EditCustomerModal";
import DeleteCustomerModal from "@/components/ControlPanel/customers/modal/DeleteCustomerModal";

const ModalsProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

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
            <NewCustomerModal />
            <EditCustomerModal />
            <DeleteCustomerModal />
        </>
    );
}

export default ModalsProvider;