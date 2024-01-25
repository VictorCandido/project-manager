import { UsersDatatableColumns } from "@/components/control-panel/users/users-datatable-columns";
import { UsersDatatable } from "@/components/control-panel/users/users-datatable";
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
