import { CheckIcon, ChevronDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { FormControl } from "./ui/form";
import { useEffect, useState } from "react";
import { Customer } from "@prisma/client";
import { listCustomers } from "@/services/customer-service";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { AppointmentSchemaType } from "@/schemas/appointment-schema";

interface PopoverCustomersProps {
    field: ControllerRenderProps<AppointmentSchemaType, 'customer'>;
    form: UseFormReturn<AppointmentSchemaType>;
}

const PopoverCustomers = ({ field, form }: PopoverCustomersProps) => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [customersLoading, setCustomersLoading] = useState<boolean>(false);
    const [openCustomerPopover, setOpenCustomerPopover] = useState<boolean>(false);

    useEffect(() => {
        loadCustomers();
    }, []);

    async function loadCustomers() {
        try {
            setCustomers(new Array());
            setCustomersLoading(true);

            const customersArray = await listCustomers();

            setCustomers(customersArray);
        } catch (error) {
            console.log('Falha ao consultar clientes - ', error);
            toast.error('Falha ao consultar clientes. Por favor tente novamente.');
        }

        setCustomersLoading(false);
    }

    function handleOpenCustomerPopover(open: boolean) {
        loadCustomers();
        setOpenCustomerPopover(open);
    }

    return (
        <Popover open={openCustomerPopover} onOpenChange={handleOpenCustomerPopover}>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        variant='outline'
                        role="combobox"
                        className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                        )}
                    >
                        {field.value
                            ? customers.find((customer) => customer.id === field.value)?.name
                            : 'Selecione um cliente'}


                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>

            <PopoverContent className="p-0 PopoverContent">
                <Command>
                    <CommandInput
                        placeholder="Digite para pesquisar..."
                        className="h-9"
                    />

                    <CommandEmpty>{customersLoading ? 'Carregando...' : 'Nenhum cliente encontrado.'}</CommandEmpty>

                    <CommandGroup>
                        {customers.map((customer) => (
                            <CommandItem
                                value={customer.name}
                                key={customer.id}
                                onSelect={() => {
                                    form.setValue('customer', customer.id);
                                    form.trigger('customer');
                                    setOpenCustomerPopover(openCustomerPopover => !openCustomerPopover);
                                }}
                            >
                                {customer.name}
                                <CheckIcon
                                    className={cn(
                                        "ml-auto h-4 w-4",
                                        customer.id === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                    )}
                                />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export default PopoverCustomers;