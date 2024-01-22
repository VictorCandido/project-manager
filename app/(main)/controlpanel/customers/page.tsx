import { CustomersDatatableColumns } from "@/components/ControlPanel/customers/CustomersDatatableColumns";
import { CustomersDatatable } from "@/components/ControlPanel/customers/CustomersDatatable";
import { db } from "@/lib/db"

export default async function Clientes() {
  const customers = await getCustomers();

  async function getCustomers() {
    const customers = await db.customer.findMany();
    return customers;
  }

  return (
    <div>
      <CustomersDatatable columns={CustomersDatatableColumns} data={customers} />
    </div>
  )
}
