'use client';

import { Customer } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import CustomersDatatableDropdownMenu from "./CustomersDatatableDropdownMenu";
import CustomersDatatableHeader from "./CustomersDatatableHeader";

export const CustomersDatatableColumns: ColumnDef<Customer>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <CustomersDatatableHeader column={column} title="ID" />,
  }, {
    accessorKey: 'name',
    header: ({ column }) => <CustomersDatatableHeader column={column} title="Nome" />,
  }, {
    id: "actions",
    cell: ({ row }) => <CustomersDatatableDropdownMenu customer={row.original} />,
  },
]