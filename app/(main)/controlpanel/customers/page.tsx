import { CustomersDatatableColumns } from "@/components/ControlPanel/customers/customers-datatable-columns";
import { CustomersDatatable } from "@/components/ControlPanel/customers/customers-datatable";
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
