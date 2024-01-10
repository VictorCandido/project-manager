"use client";

import { NavigateContext } from "@/contexts/NavigateContext"
import { Plus } from "lucide-react";
import { useContext, useEffect } from "react"

import { DatePicker } from "@/components/Datepicker/Datepicker";
import { Button } from "@/components/ui/button";
import AppointmentCard from "@/components/AppointmentCard/AppointmentCard";



export default function PainelControle() {
  const { setPage } = useContext(NavigateContext);

  useEffect(() => {
    setPage({ key: 'appointments', title: 'Apontamentos' });
  }, [setPage]);

  return (
   <div>
    {/* HEADER */}
    <div className="flex justify-end gap-4">
      <DatePicker />
      
      <Button className="gap-2">
        <Plus /> Novo Apontamento
      </Button>
    </div>

    {/* CONTENT */}
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">01 de janeiro de 2024</h2>

      <AppointmentCard />
      <AppointmentCard />
      <AppointmentCard />
      <AppointmentCard />

    </div>
   </div>
  )
}
