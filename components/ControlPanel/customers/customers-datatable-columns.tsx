'use client';

import { Customer } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import CustomersDatatableDropdownMenu from "./customers-datatable-dropdown-menu";
import { DataTableColumnHeader } from "@/components/Datatable/datatable-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getNameFeedback } from "@/utils/global-functions";

export const CustomersDatatableColumns: ColumnDef<Customer>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    enableHiding: true,

  }, {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nome" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <Avatar>
              <AvatarImage src={row.original.imageUrl || ''} />
              <AvatarFallback>{getNameFeedback(row.original.name)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium">{row.original.name}</div>
          </div>
        </div>
      )
    },
  }, {
    id: "actions",
    cell: ({ row }) => <CustomersDatatableDropdownMenu customer={row.original} />,
  },
]