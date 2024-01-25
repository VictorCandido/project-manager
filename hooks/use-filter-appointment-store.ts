import { create } from "zustand"

interface FilterAppointmentStore {
    filterDate: Date | undefined;
    setfilterDate: (filterDate: Date | undefined) => void;
}

export const useFilterAppointment = create<FilterAppointmentStore>((set) => ({
    filterDate: undefined,
    setfilterDate: (filterDate) => set({ filterDate }),
}));