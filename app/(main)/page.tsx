"use client";

import { NavigateContext } from "@/contexts/NavigateContext"
import { useContext, useEffect } from "react"

export default function Home() {
  const { setPage } = useContext(NavigateContext);

  useEffect(() => {
    setPage({ key: 'home', title: 'Home' });
  }, [setPage]);

  return (
   <div>
    home
   </div>
  )
}
