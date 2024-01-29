import { Pencil, MoreHorizontal, Trash2 } from "lucide-react";

import { Button } from "@/componentes/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/componentes/ui/dropdown-menu";
import { Profile } from "@prisma/client";

interface UsersDatatableDropdownMenuProps {
    user: Profile;
}

const UsersDatatableDropdownMenu = ({ user }: UsersDatatableDropdownMenuProps) => {
    function handleEditUser() {
        console.log('edit user');
    }

    function handleRemoveUser() {
        console.log('remove user');
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ações</DropdownMenuLabel>

                <DropdownMenuItem onClick={handleEditUser}>
                    <Pencil className="h-4 w-4 mr-2" /> Editar
                </DropdownMenuItem>

                <DropdownMenuItem onClick={handleRemoveUser}>
                    <Trash2 className="h-4 w-4 mr-2" /> Remover
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default UsersDatatableDropdownMenu;