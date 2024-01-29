import ComingSoon from "@/components/coming-soon/coming-soon";
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
