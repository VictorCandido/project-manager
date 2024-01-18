import { Button } from "@/components/ui/button";
import { Customer } from "@prisma/client";
import { Column } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

interface CustomersDatatableHeaderProps {
    column: Column<Customer>;
    title: string;
}

const CustomersDatatableHeader = ({ column, title }: CustomersDatatableHeaderProps) => {
    return (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            {title}
            <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    );
}

export default CustomersDatatableHeader;