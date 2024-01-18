import { CustomersDatatableColumns } from "@/components/ControlPanel/customers/CustomersDatatableColumns";
import { CustomersDatatable } from "@/components/ControlPanel/customers/CustomersDatatable";
import { db } from "@/lib/db"
import { toast } from "sonner";

export default async function Clientes() {
  const customers = await getCustomers();

  async function getCustomers() {
    try {
      const customers = await db.customer.findMany();
      return customers;
    } catch (error) {
      console.log('Falha ao consultar clientes.', error);
      toast.error('Falha ao consultar clientes.');
    }
  }

  return (
    <div>
      {customers?.length && <CustomersDatatable columns={CustomersDatatableColumns} data={customers} />}
    </div>
  )
}
