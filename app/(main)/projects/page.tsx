"use client";

import { NavigateContext } from "@/contexts/NavigateContext"
import { useContext, useEffect } from "react"

export default function Projetos() {
  const { setPage } = useContext(NavigateContext);

  useEffect(() => {
    setPage({ key: 'projects', title: 'Projetos' });
  }, [setPage]);

  return (
   <div>
    projetos
   </div>
  )
}
