"use client";

import { useEffect, useState } from "react";
import NewAppointmentModal from "../components/Appointment/modal/new-appointment-modal";
import EditAppointmentModal from "@/components/Appointment/modal/edit-appointment-modal";
import DeleteAppointmentModal from "@/components/Appointment/modal/delete-appointment-modal";
import NewCustomerModal from "@/components/ControlPanel/customers/modal/new-customer-modal";
import EditCustomerModal from "@/components/ControlPanel/customers/modal/edit-customer-modal";
import DeleteCustomerModal from "@/components/ControlPanel/customers/modal/delete-customer-modal";

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