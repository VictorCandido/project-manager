'use client';

import { Customer } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import CustomersDatatableDropdownMenu from "./CustomersDatatableDropdownMenu";

export const CustomersDatatableColumns: ColumnDef<Customer>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  }, {
    accessorKey: 'name',
    header: 'Nome'
  }, {
    id: "actions",
    cell: ({ row }) => <CustomersDatatableDropdownMenu customer={row.original} />,
  },
]