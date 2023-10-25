"use client";

import { DataTableColumnHeader } from "@/components/Datatable/DataTableColumnHeader";
import { DataTableRowActions } from "@/components/Datatable/DataTableRowActions";
import { DataTable } from "@/components/Datatable/Datatable";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

const userSchema = z.object({
    id: z.string().min(1),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    mail: z.string().min(1),
    profileImage: z.string().optional(),
});
  
type UserProps = z.infer<typeof userSchema>

const Users = () => {
    const data: UserProps[] = [
        { id: '123', firstName: 'Victor', lastName: 'Candido', mail: 'victorev@outlook.com' },
        { id: '1', firstName: 'Victor', lastName: 'Candido', mail: 'victorev@outlook.com' },
        { id: '23', firstName: 'Victor', lastName: 'Candido', mail: 'victorev@outlook.com' },
        { id: '3', firstName: 'Victor', lastName: 'Candido', mail: 'victorev@outlook.com' },
        { id: '34', firstName: 'Victor', lastName: 'Candido', mail: 'victorev@outlook.com' },
        { id: '5', firstName: 'Victor', lastName: 'Candido', mail: 'victorev@outlook.com' },
    ];

    const columns: ColumnDef<UserProps>[] = [
        {
            accessorKey: 'id',
            header: ({ column }) => <DataTableColumnHeader column={column} title="ID"/>,
        },
        {
            accessorKey: 'name',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Nome"/>,
            cell: ({ row }) => <span>{ row.original.firstName } { row.original.lastName }</span> 
        },
        {
            accessorKey: 'mail',
            header: ({ column }) => <DataTableColumnHeader column={column} title="E-mail"/>,
        },
        // {
        //     id: "actions",
        //     cell: ({ row }) => <DataTableRowActions row={row} />,
        // },
    ];

    return (
        <div>
            Users
            
            <DataTable data={data} columns={columns} />


        </div>
    );
}
 
export default Users;