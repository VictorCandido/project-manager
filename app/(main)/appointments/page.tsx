"use client";

import { Button } from "@/components/ui/button";
import { NavigateContext } from "@/contexts/NavigateContext"
import { useContext, useEffect } from "react"

export default function PainelControle() {
  const { setPage } = useContext(NavigateContext);

  useEffect(() => {
    setPage({ key: 'appointments', title: 'Apontamentos' });
  }, [setPage]);

  return (
   <div>
    Apontamentos

    <Button>Teste</Button>
   </div>
  )
}
