import { Suspense } from "react";

import AppointmentSkeleton from "@/components/Appointment/AppointmentDaySkeleton";
import AppointmentData from "@/components/Appointment/AppointmentData";
import AppointmentHeader from "@/components/Appointment/AppointmentHeader";
import { currentProfile } from "@/lib/currentProfile";
import { redirect } from "next/navigation";

export default async function PainelControle() {
  const profile = await currentProfile();

  if (!profile) {
    return redirect('/');
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
    <div className="flex flex-col gap-4">
      <Suspense fallback={<AppointmentSkeleton />}>
        <AppointmentData profile={profile}/>
      </Suspense>
    </div>
   </div>
  )
}
