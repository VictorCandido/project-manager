import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

const SetupPage = async () => {
  const profile = await initialProfile();

  if (profile) {
    return redirect(`/home`);
  }

  return (
    <div>Falha ao logar no sistema</div>
  )
}

export default SetupPage;