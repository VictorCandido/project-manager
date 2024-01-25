import { CalendarIcon, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { useModal } from "@/hooks/use-modal-store";
import { useState } from "react";
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
import { AppointmentSchema, AppointmentSchemaType } from "@/schemas/appointment-schema";
import { formatTime } from "@/utils/global-functions";
import { createAppointment } from "@/services/appointment-service";
import PopoverCustomers from "@/components/PopoverCustomers";

const NewAppointmentModal = () => {
    const [openDatePopover, setOpenDatePopover] = useState<boolean>(false);

    const router = useRouter();
    const { isOpen, onClose, type } = useModal();

    const form = useForm<AppointmentSchemaType>({
        resolver: zodResolver(AppointmentSchema),
        defaultValues: {
            customer: '',
            date: getDateWhithoutHours(),
            start: '',
            end: '',
            description: '',
        },
    });

    const isModalOpen = isOpen && type === 'newAppointment';
    const isLoading = form.formState.isSubmitting;

    async function onSubmit(values: AppointmentSchemaType) {
        try {
            await createAppointment(values);

            toast.success('Apontamento criado com sucesso.');
            form.reset();
            router.refresh();
            onClose();
        } catch (error) {
            console.log('Falha ao registrar apontamento - ', error);
            toast.error('Falha ao registrar apontamento. Por favor tente novamente.');
        }
    }

    function handleClose() {
        form.reset();
        onClose();
    }

    function getDateWhithoutHours() {
        const dateNow = new Date();
        const dateString = `${dateNow.getFullYear()}-${dateNow.getMonth() + 1}-${dateNow.getDate()}`;
        return new Date(dateString);
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
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

                                    <PopoverCustomers field={field} form={form} />

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
                                <Loader2 className={`h-4 w-4 animate-spin mr-2 ${!isLoading && 'hidden'}`} />
                                Salvar
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default NewAppointmentModal;