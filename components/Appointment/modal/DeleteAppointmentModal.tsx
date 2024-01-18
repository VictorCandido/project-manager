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

const DeleteAppointmentModal = () => {
    const { isOpen, onClose, type, data: { appointmentData } } = useModal();
    const router = useRouter();

    const isModalOpen = isOpen && type === 'deleteAppointment';
    
    async function handleConfirm() {
        try {
            const { data } = await axios.delete<ResponseModel<Appointment>>(`/api/appointment/${appointmentData?.id}`);
            
            if (data.error) {
                throw data.data;
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