"use client";

import { NavigateContext } from "@/contexts/NavigateContext"
import { useContext, useEffect } from "react"

export default function PainelControle() {
  const { setPage } = useContext(NavigateContext);

  useEffect(() => {
    setPage({ key: 'controlpanel', title: 'Painel de Controle' });
  }, [setPage]);

  return (
   <div>
    painelControle
   </div>
  )
}
