"use client";

import { useEffect, useState } from "react";
import NewAppointmentModal from "../componentes/appointment/modal/new-appointment-modal";
import EditAppointmentModal from "@/componentes/appointment/modal/edit-appointment-modal";
import DeleteAppointmentModal from "@/componentes/appointment/modal/delete-appointment-modal";
import NewCustomerModal from "@/componentes/control-panel/customers/modal/new-customer-modal";
import EditCustomerModal from "@/componentes/control-panel/customers/modal/edit-customer-modal";
import DeleteCustomerModal from "@/componentes/control-panel/customers/modal/delete-customer-modal";

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