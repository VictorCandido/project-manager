import { AppointmentCustomerProps } from '@/types/appointment-customer-props';
import { Customer } from '@prisma/client';
import { create } from 'zustand';

type ModalType = 'newAppointment' | 'editAppointment' | 'deleteAppointment' | 'newCustomer' | 'editCustomer' | 'deleteCustomer';

type modalData = {
    appointmentData?: AppointmentCustomerProps;
    customerData?: Customer;
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