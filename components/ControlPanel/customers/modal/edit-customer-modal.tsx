import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal-store";
import { CustomerSchemaType, customerSchema } from "@/schemas/customer-schema";
import UploadComponent from "@/components/UploadThing/upload-component";
import { updateCustomer } from "@/services/customer-service";

const EditCustomerModal = () => {
    const { isOpen, onClose, type, data: { customerData } } = useModal();
    const router = useRouter();

    const form = useForm<CustomerSchemaType>({
        resolver: zodResolver(customerSchema),
        defaultValues: {
            name: "",
            imageUrl: "",
        },
    });

    const isModalOpen = isOpen && type === "editCustomer";
    const isLoading = form.formState.isSubmitting;

    async function onSubmit(values: CustomerSchemaType) {
        try {
            if (customerData) {
                await updateCustomer(values, customerData?.id);

                toast.success("Cliente atualizado com sucesso!");
                form.reset();
                router.refresh();
                onClose();
            }
        } catch (error) {
            toast.error('Falha ao atualizar cliente. Por favor tente novamente.');
        }
    }

    function handleClose() {
        onClose();
    }

    useEffect(() => {
        if (customerData) {
            form.setValue('name', customerData.name);
            form.setValue('imageUrl', customerData.imageUrl || '');
        }
    }, [form, customerData]);

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Editar Cliente</DialogTitle>
                    <DialogDescription>
                        Insira os dados do cliente.
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

export default EditCustomerModal;