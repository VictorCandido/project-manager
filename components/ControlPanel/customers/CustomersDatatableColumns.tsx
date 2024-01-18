'use client';

import { Customer } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import CustomersDatatableDropdownMenu from "./CustomersDatatableDropdownMenu";
import { DataTableColumnHeader } from "@/components/Datatable/DataTableColumnHeader";

export const CustomersDatatableColumns: ColumnDef<Customer>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    enableHiding: true,

  }, {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nome" />,
  }, {
    id: "actions",
    cell: ({ row }) => <CustomersDatatableDropdownMenu customer={row.original} />,
  },
]