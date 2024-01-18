import { CalendarIcon, CheckIcon, ChevronDown, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from 'axios';
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { useModal } from "@/hooks/useModalStore";
import { useEffect, useState } from "react";
import { Appointment, Customer } from "@prisma/client";
import { toast } from "sonner"
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "../../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "../../ui/calendar";
import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle, 
} from "@/components/ui/dialog"
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form"
import { 
    Command, 
    CommandEmpty, 
    CommandGroup, 
    CommandInput, 
    CommandItem 
} from "../../ui/command";
import ResponseModel from "@/models/ResponseModel";

const formSchema = z.object({
    customer: z.string().min(1, 'Informe o cliente.'),
    date: z.date(),
    start: z.string().min(1, 'Informe a hora de início.'),
    end: z.string().min(1, 'Informe a hora de fim.'),
    description: z.string().min(1, 'Informe a descrição.'),
});

type NewAppointmentType = z.infer<typeof formSchema>;

const EditAppointmentModal = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [customersLoading, setCustomersLoading] = useState<boolean>(false);
    const [openCustomerPopover, setOpenCustomerPopover] = useState<boolean>(false);
    const [openDatePopover, setOpenDatePopover] = useState<boolean>(false);

    const router = useRouter();
    const { isOpen, onClose, type, data: { appointmentData } } = useModal();

    const form = useForm<NewAppointmentType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          customer: '',
          date: getDateWhithoutHours(),
          start: '',
          end: '',
          description: '',
        },
    });

    const isModalOpen = isOpen && type === 'editAppointment';
    const isLoading = form.formState.isSubmitting;

    useEffect(() => {
        if (appointmentData) {
            loadCustomers(true);

            form.setValue('customer', appointmentData.customerId);
            form.setValue('date', appointmentData.date);
            form.setValue('description', appointmentData.description);
            form.setValue('end', appointmentData.end);
            form.setValue('start', appointmentData.start);
        }
    }, [appointmentData, form]);

    async function onSubmit(values: NewAppointmentType) {
        try {
            const { data } = await axios.put<ResponseModel<Appointment>>(`/api/appointment/${appointmentData?.id}`, values);
            
            if (data.error) {
                throw data.data;
            }
    
            toast.success('Apontamento atualizado com sucesso.');
            form.reset();
            router.refresh();
            onClose();
        } catch (error) {
            console.log('Falha ao atualizar apontamento - ', error);
            toast.error('Falha ao atualizar apontamento. Por favor tente novamente.');
        }
    }

    function handleClose() {
        // form.reset();
        onClose();
    }

    async function loadCustomers(isOpen: boolean) {
        try {
            if (isOpen) {
                setCustomers(new Array());
                setCustomersLoading(true);
        
                const { data: responseData } = await axios.get<ResponseModel<Customer[]>>('/api/customer');
    
                if (responseData.error) {
                    throw responseData.data;
                }
                
                setCustomers(responseData.data);
            }
        } catch (error) {
            console.log('Falha ao consultar clientes - ', error);
            toast.error('Falha ao consultar clientes. Por favor tente novamente.');
        }
        
        setCustomersLoading(false);
    }

    function getDateWhithoutHours() {
        const dateNow = new Date();
        const dateString = `${dateNow.getFullYear()}-${dateNow.getMonth() + 1}-${dateNow.getDate()}`;
        return new Date(dateString); 
    }

    function formatTime(timeString: string) {
        let timeStringOnlyNumbers = "";
        let timeFormatted = "";
        let splittedString = new Array();
        let hourFourDigits = "";
      
        if (typeof timeString !== "string") {
          return "";
        }
      
        timeStringOnlyNumbers = timeString.replace(/\D/g, "");
      
        switch (timeStringOnlyNumbers.length) {
          case 0:
            timeFormatted = "";
            break;
      
          case 1:
            timeFormatted = "0" + timeStringOnlyNumbers + ":00";
            break;
      
          case 2:
            if (parseInt(timeStringOnlyNumbers) > 24) {
              timeFormatted = "";
              break;
            }
      
            if (timeStringOnlyNumbers === "24") {
              timeFormatted = "00:00";
              break;
            }
      
            timeFormatted = timeStringOnlyNumbers + ":00";
            break;
      
          case 3:
            splittedString = timeStringOnlyNumbers.split("");
      
            if (parseInt(splittedString[1] + splittedString[2]) > 59) {
              splittedString[1] = "5";
              splittedString[2] = "9";
            }
      
            timeFormatted =
              "0" + splittedString[0] + ":" + splittedString[1] + splittedString[2];
            break;
      
          default:
            hourFourDigits = timeStringOnlyNumbers.substr(0, 4);
            splittedString = hourFourDigits.split("");
      
            if (parseInt(splittedString[0] + splittedString[1]) > 24) {
              timeFormatted = "";
              break;
            }
      
            if (splittedString[0] + splittedString[1] === "24") {
              splittedString[0] = "0";
              splittedString[1] = "0";
            }
      
            if (parseInt(splittedString[2] + splittedString[3]) > 59) {
              splittedString[2] = "5";
              splittedString[3] = "9";
            }
      
            timeFormatted =
              splittedString[0] +
              splittedString[1] +
              ":" +
              splittedString[2] +
              splittedString[3];
            break;
        }
      
        return timeFormatted;
    }

    function handleOpenCustomerPopover(open: boolean) {
        loadCustomers(open);
        setOpenCustomerPopover(open);
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={ handleClose }>
            <DialogContent className="sm:max-w-7xl">
                <DialogHeader>
                    <DialogTitle>Editar Apontamento</DialogTitle>
                    <DialogDescription>
                        Insira a descrição de suas atividades.
                    </DialogDescription>
                </DialogHeader>
                
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {/* CLIENTE */}
                        <FormField 
                            control={form.control}
                            name="customer"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Cliente</FormLabel>

                                    <Popover onOpenChange={handleOpenCustomerPopover} open={openCustomerPopover}>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant='outline'
                                                    role="combobox"
                                                    className={cn(
                                                        "w-full justify-between",
                                                        !field.value && "text-muted-foreground"
                                                    )}    
                                                    onClick={() => setOpenCustomerPopover(openCustomerPopover => !openCustomerPopover)}
                                                >
                                                    {field.value 
                                                        ? customers?.find((customer) => customer.id === field.value)?.name
                                                        : 'Selecione um cliente'}


                                                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
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
                                                    {customers?.map((customer) => (
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

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    
                        <div className="flex gap-4 w-full">
                            {/* DATA */}
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Data</FormLabel>
                                        
                                        <FormControl>
                                            <Popover onOpenChange={setOpenDatePopover} open={openDatePopover}>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full justify-start text-left font-normal",
                                                            !form.getValues('date') && "text-muted-foreground"
                                                        )}
                                                    >
                                                    {format(form.getValues('date'), "PPP", { locale: ptBR })}
                                                    
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                        mode="single"
                                                        selected={form.getValues('date')}
                                                        onSelect={(value) => {
                                                            form.setValue('date', value || getDateWhithoutHours());
                                                            setOpenDatePopover(openDatePopover => !openDatePopover);
                                                        }}
                                                        locale={ptBR}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
                                        
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        
                            {/* INÍCIO */}
                            <FormField
                                control={form.control}
                                name="start"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Início</FormLabel>
                                        
                                        <FormControl>
                                            <Input 
                                                onBlurCapture={e => {
                                                    form.setValue('start', formatTime(e.currentTarget.value))
                                                }}
                                                placeholder="Informe a hora de início..." 
                                                {...field} 
                                            />
                                        </FormControl>
                                        
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        
                            {/* FIM */}
                            <FormField
                                control={form.control}
                                name="end"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Fim</FormLabel>
                                        
                                        <FormControl>
                                            <Input 
                                                onBlurCapture={e => {
                                                    form.setValue('end', formatTime(e.currentTarget.value))
                                                }} 
                                                placeholder="Informe a hora de fim..." 
                                                {...field} 
                                            />
                                        </FormControl>
                                        
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    
                        {/* DESCRIÇÃO */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descrição</FormLabel>
                                    
                                    <FormControl>
                                        <Textarea placeholder="Informe a descrição..." rows={8} {...field} />
                                    </FormControl>
                                    
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                       
                        <DialogFooter>
                            <Button type="submit" disabled={isLoading}>
                                <Loader2 className={`h-4 w-4 animate-spin mr-2 ${!isLoading && 'hidden'}`}/>
                                Salvar
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
 
export default EditAppointmentModal;