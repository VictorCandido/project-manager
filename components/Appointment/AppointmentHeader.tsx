"use client";

import { Plus } from "lucide-react";
import { useModal } from "@/hooks/useModalStore";

import { DatePicker } from "../Datepicker/Datepicker";
import { Button } from "../ui/button";

const AppointmentHeader = () => {
  const { onOpen } = useModal();
  
    return (
        <div className="flex justify-end gap-4">
            <DatePicker />
            
            <Button onClick={() => onOpen('newAppointment')}>
                <Plus /> Novo Apontamento
            </Button>
        </div>
    );
}
 
export default AppointmentHeader;