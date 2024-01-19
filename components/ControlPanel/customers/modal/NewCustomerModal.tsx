import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/useModalStore";
import ResponseModel from "@/models/ResponseModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { Customer } from "@prisma/client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
    name: z.string().min(1, { message: "Informe o nome" }),
});

type ProfileType = z.infer<typeof formSchema>;

const NewCustomerModal = () => {
    const { isOpen, onClose, type } = useModal();
    const router = useRouter();

    const form = useForm<ProfileType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const isModalOpen = isOpen && type === "newCustomer";
    const isLoading = form.formState.isSubmitting;

    async function onSubmit(values: ProfileType) {
        try {
            const { data } = await axios.post<ResponseModel<Customer>>("/api/customer", values);

            if (data.error) {
                throw data.data;
            }

            toast.success("Cliente cadastrado com sucesso!");
            form.reset();
            router.refresh();
            onClose();
        } catch (error) {
            console.log('Falha ao registrar cliente - ', error);
            toast.error('Falha ao registrar cliente. Por favor tente novamente.');
        }
    }

    function handleClose() {
        form.reset();
        onClose();
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Novo Cliente</DialogTitle>
                    <DialogDescription>
                        Insira os dados do novo cliente.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Nome</FormLabel>

                                    <FormControl>
                                        <Input
                                            placeholder="Informe o nome do cliente..."
                                            {...field}
                                        />
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

export default NewCustomerModal;