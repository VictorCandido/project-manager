import { AppointmentCustormerProps } from '@/types/AppointmentCustormerProps';
import { create } from 'zustand';

type ModalType = 'newAppointment' | 'editAppointment';

type modalData = {
    appointmentData?: AppointmentCustormerProps;
}

interface ModalStore {
    type: ModalType | null;
    data: modalData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: modalData) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
    onClose: () => set({ type: null, isOpen: false })
}));