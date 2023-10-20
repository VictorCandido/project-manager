"use client";

import { NavigateContext } from "@/contexts/NavigateContext"
import { useContext, useEffect } from "react"

export default function Clientes() {
  const { setPage } = useContext(NavigateContext);

  useEffect(() => {
    setPage({ key: 'customers', title: 'Clientes' });
  }, [setPage]);

  return (
   <div>
    clientes
   </div>
  )
}
