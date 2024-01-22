import { Pencil, MoreHorizontal, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Customer } from "@prisma/client";
import { useModal } from "@/hooks/useModalStore";

interface CustomersDatatableDropdownMenuProps {
    customer: Customer;
}

const CustomersDatatableDropdownMenu = ({ customer }: CustomersDatatableDropdownMenuProps) => {
    const { onOpen } = useModal();

    function handleEditCustomer() {
        onOpen('editCustomer', { customerData: customer });
    }

    function handleRemoveCustomer() {
        onOpen('deleteCustomer', { customerData: customer });
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

                <DropdownMenuItem onClick={handleEditCustomer}>
                    <Pencil className="h-4 w-4 mr-2" /> Editar
                </DropdownMenuItem>

                <DropdownMenuItem onClick={handleRemoveCustomer}>
                    <Trash2 className="h-4 w-4 mr-2" /> Remover
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default CustomersDatatableDropdownMenu;