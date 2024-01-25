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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteAppointment } from "@/services/AppointmentService";

const DeleteAppointmentModal = () => {
    const { isOpen, onClose, type, data: { appointmentData } } = useModal();
    const router = useRouter();

    const isModalOpen = isOpen && type === 'deleteAppointment';

    async function handleConfirm() {
        try {
            if (appointmentData) {
                await deleteAppointment(appointmentData.id);
            }

            toast.success('Apontamento removido com sucesso.');
            router.refresh();
            onClose();
        } catch (error) {
            console.log('Falha ao remover apontamento - ', error);
            toast.error('Falha ao remover apontamento. Por favor tente novamente.');
        }
    }

    return (
        <AlertDialog open={isModalOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Remover Apontamento</AlertDialogTitle>
                    <AlertDialogDescription>
                        Você tem certeza que deseja remover o apontamento do cliente <b>{appointmentData?.customer.name}</b>? Essa ação não pode ser desfeita.
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

export default DeleteAppointmentModal;