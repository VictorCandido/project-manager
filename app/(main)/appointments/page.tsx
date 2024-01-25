import { Suspense } from "react";
import { redirect } from "next/navigation";
import { Metadata } from "next";

import AppointmentSkeleton from "@/components/Appointment/AppointmentDaySkeleton";
import AppointmentData from "@/components/Appointment/AppointmentData";
import AppointmentHeader from "@/components/Appointment/AppointmentHeader";
import { currentProfile } from "@/lib/currentProfile";
import { AppointmentCustomerProps } from "@/types/AppointmentCustomerProps";
import { GroupedAppointmentCustomerProps } from "@/types/GroupedAppointmentCustomerProps";
import { listAppointments } from "@/services/AppointmentService";

export const metadata: Metadata = {
  title: "Apontamentos | Project Manager"
}

export default async function PainelControle() {
  const profile = await currentProfile();

  if (!profile) {
    return redirect('/');
  }

  const appointments = await listAppointments();
  const groupedAppointments = groupAppoitments(appointments);

  function groupAppoitments(appointments: AppointmentCustomerProps[]) {
    const groupedAppointments = new Array<GroupedAppointmentCustomerProps>();

    for (let i = 0; i < appointments.length; i++) {
      let achou = false;

      for (let j = 0; j < groupedAppointments.length; j++) {
        if (String(groupedAppointments[j].date) === String(appointments[i].date)) {
          groupedAppointments[j].appointments.push(appointments[i]);

          achou = true;
          break;
        }
      }

      if (!achou) {
        groupedAppointments.push({
          date: appointments[i].date,
          appointments: new Array(appointments[i])
        });
      }
    }

    return groupedAppointments;
  }

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between mb-5">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Apontamentos</h2>

          <p className="text-muted-foreground">
            Consulte os apontamentos realizados ou registre um novo.
          </p>
        </div>

        <AppointmentHeader />

      </div>

      {/* CONTENT */}
      <Suspense fallback={<AppointmentSkeleton />}>
        <AppointmentData groupedAppointments={groupedAppointments} />
      </Suspense>
    </div>
  )
}
