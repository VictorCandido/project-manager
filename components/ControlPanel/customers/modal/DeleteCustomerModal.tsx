import { useModal } from "@/hooks/useModalStore";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import axios from "axios";
import ResponseModel from "@/models/ResponseModel";
import { Appointment } from "@prisma/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteCustomer } from "@/services/CustomerService";

const DeleteCustomerModal = () => {
    const { isOpen, onClose, type, data: { customerData } } = useModal();
    const router = useRouter();

    const isModalOpen = isOpen && type === 'deleteCustomer';

    async function handleConfirm() {
        try {
            if (customerData) {
                await deleteCustomer(customerData.id);
            }

            toast.success('Cliente removido com sucesso.');
            router.refresh();
            onClose();
        } catch (error) {
            console.log('Falha ao remover cliente - ', error);
            toast.error('Falha ao remover cliente. Por favor tente novamente.');
        }
    }

    return (
        <AlertDialog open={isModalOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Remover Cliente</AlertDialogTitle>
                    <AlertDialogDescription>
                        Você tem certeza que deseja remover o cliente <b>{customerData?.name}</b>? Essa ação não pode ser desfeita.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm}>Confirmar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default DeleteCustomerModal;