import { initialProfile } from "@/lib/initialProfile";
import { redirect } from "next/navigation";

const SetupPage = async () => {
  await initialProfile();

  return redirect(`/home`);
}
 
export default SetupPage;