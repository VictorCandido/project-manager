import { CalendarIcon, CheckIcon, ChevronDown, Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { Calendar } from "../ui/calendar";
import { useModal } from "@/hooks/useModalStore";

const formSchema = z.object({
    customer: z.string().min(1, 'Informe o cliente.'),
    date: z.date(),
    start: z.string().min(1, 'Informe a hora de início.'),
    end: z.string().min(1, 'Informe a hora de fim.'),
    description: z.string().min(1, 'Informe a descrição.'),
});

type NewAppointmentType = z.infer<typeof formSchema>;

const customers = [
    { id: '1', name: 'Francal', },
    { id: '2', name: 'SEBRAE', },
    { id: '3', name: 'Colares Linhares', },
    { id: '4', name: 'Iv2 - Tech Leader', },
    { id: '5', name: 'Iv2 - Arquitetura', },
]

const NewAppointmentModal = () => {
    const { isOpen, onClose, type } = useModal();

    const isModalOpen = isOpen && type === 'newAppointment';

    const form = useForm<NewAppointmentType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          customer: '',
          date: new Date(),
          start: '',
          end: '',
          description: '',
        },
    });

    function onSubmit(values: NewAppointmentType) {
        console.log(values);
        onClose();
    }

    const handleClose = () => {
        form.reset();
        onClose();
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

    return (
        <Dialog open={isModalOpen} onOpenChange={ handleClose }>
            <DialogContent className="sm:max-w-7xl">
                <DialogHeader>
                    <DialogTitle>Novo Apontamento</DialogTitle>
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

                                    <Popover>
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

                                                <CommandEmpty>Nenhum cliente encontrado.</CommandEmpty>

                                                <CommandGroup>
                                                    {customers.map((customer) => (
                                                        <CommandItem
                                                            value={customer.name}
                                                            key={customer.id}
                                                            onSelect={() => {
                                                                form.setValue('customer', customer.id);
                                                                form.trigger('customer');
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
                                            <Popover>
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
                                                        onSelect={(value) => form.setValue('date', value || new Date())}
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
                                        <Textarea placeholder="Informe a descrição..." {...field} />
                                    </FormControl>
                                    
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                       
                        <DialogFooter>
                            <Button type="submit">Salvar</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
 
export default NewAppointmentModal;