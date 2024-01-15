"use client";

import { NavigateContext } from "@/contexts/NavigateContext"
import { Plus } from "lucide-react";
import { useContext, useEffect, useState } from "react"
import axios from "axios";
import { useModal } from "@/hooks/useModalStore";
import { toast } from "sonner";

import { DatePicker } from "@/components/Datepicker/Datepicker";
import { Button } from "@/components/ui/button";
import AppointmentDay from "@/components/Appointment/AppointmentDay";
import AppointmentSkeleton from "@/components/Appointment/AppointmentDaySkeleton";
import ResponseModel from "@/models/ResponseModel";
import { AppointmentCustormerProps } from "@/types/AppointmentCustormerProps";

export default function PainelControle() {
  const [appointments, setAppointments] = useState<AppointmentCustormerProps[]>([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState<boolean>(false);
  const { setPage } = useContext(NavigateContext);
  const { onOpen } = useModal();

  useEffect(() => {
    setPage({ key: 'appointments', title: 'Apontamentos' });

    loadAppointments();
  }, [setPage]);

  async function loadAppointments() {
    setAppointmentsLoading(true);

    try {
      const { data } = await axios.get<ResponseModel<AppointmentCustormerProps[]>>('/api/appointment');

      if (data.error) {
        throw data.data;
      }

      setAppointments(data.data);
    } catch (error) {
      console.log('Falha ao consultar apontamentos - ', error);
      toast.error('Falha ao consultar apontamentos. Por favor tente novamente.');
    }

    setAppointmentsLoading(false);
  }

  return (
   <div>
    {/* HEADER */}
    <div className="flex justify-end gap-4">
      <DatePicker />
      
      {/* <NewAppointmentModal /> */}
      <Button onClick={() => onOpen('newAppointment')}>
        <Plus /> Novo Apontamento
      </Button>
    </div>

    {/* CONTENT */}
    <div className="flex flex-col gap-4">

      {
        appointmentsLoading 
        ? <AppointmentSkeleton />
        : appointments.length
        ? <AppointmentDay data={appointments}/>
        : 'Nenhum apontamento encontrado...'
      }

    </div>
   </div>
  )
}
