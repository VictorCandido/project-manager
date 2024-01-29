'use client';

import { Profile } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import UsersDatatableDropdownMenu from "./users-datatable-dropdown-menu";
import { DataTableColumnHeader } from "@/componentes/datatable/datatable-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/componentes/ui/avatar";

export const UsersDatatableColumns: ColumnDef<Profile>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    enableHiding: true,

  }, {
    accessorKey: 'userId',
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID Clerk" />,
    enableHiding: true,

  }, {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nome" />,
    cell: ({ row }) => {
      // exibe o nome do usuário e a imagem de perfil em um avatar
      return (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <Avatar>
              <AvatarImage src={row.original.imageUrl} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium">{row.original.name}</div>
          </div>
        </div>
      )
    },
  }, {
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} title="E-mail" />,
  }, {
    id: "actions",
    cell: ({ row }) => <UsersDatatableDropdownMenu user={row.original} />,
  },
]