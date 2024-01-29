import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import UploadComponent from "@/componentes/uploadthing/upload-component";
import { Button } from "@/componentes/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/componentes/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/componentes/ui/form";
import { Input } from "@/componentes/ui/input";
import { useModal } from "@/hooks/use-modal-store";
import { CustomerSchemaType, customerSchema } from "@/schemas/customer-schema";
import { createCustomer } from "@/services/customer-service";

const NewCustomerModal = () => {
    const { isOpen, onClose, type } = useModal();
    const router = useRouter();

    const form = useForm<CustomerSchemaType>({
        resolver: zodResolver(customerSchema),
        defaultValues: {
            imageUrl: '',
            name: '',
        }
    });

    const isModalOpen = isOpen && type === "newCustomer";
    const isLoading = form.formState.isSubmitting;

    async function onSubmit(values: CustomerSchemaType) {
        try {
            await createCustomer(values);

            toast.success("Cliente cadastrado com sucesso!");
            form.reset();
            router.refresh();
            onClose();
        } catch (error) {
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
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Logo</FormLabel>
                                    <div className="flex items-center justify-center text-center">

                                        <FormControl>
                                            <UploadComponent
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>

                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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