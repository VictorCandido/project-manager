import { UsersDatatableColumns } from "@/components/ControlPanel/users/UsersDatatableColumns";
import { UsersDatatable } from "@/components/ControlPanel/users/UsersDatatable";
import { db } from "@/lib/db"
import { toast } from "sonner";

export default async function Users() {
    const users = await getUsers();

    async function getUsers() {
        try {
            const users = await db.profile.findMany();
            return users;
        } catch (error) {
            console.log('Falha ao consultar usuários.', error);
            toast.error('Falha ao consultar usuários.');
        }
    }

    return (
        <div>
            {users?.length && <UsersDatatable columns={UsersDatatableColumns} data={users} />}
        </div>
    )
}
