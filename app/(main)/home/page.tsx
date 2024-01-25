import ComingSoon from "@/components/ComingSoon/coming-soon";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Project Manager"
}

export default function Home() {
  return (
    <div>
      <ComingSoon />
    </div>
  )
}
