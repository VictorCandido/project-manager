import ResponseModel from "@/models/ResponseModel";
import { AppointmentSchemaType } from "@/schemas/AppointmentSchema";
import { Appointment } from "@prisma/client";
import axios from "axios";

export async function createAppointment(values: AppointmentSchemaType) {
    try {
        const { data } = await axios.post<ResponseModel<Appointment>>('/api/appointment', values);

        if (data.error) {
            throw data.data;
        }

        return data.data;
    }
    catch (error) {
        console.log('Falha ao registrar agendamento - ', error);
        throw error;
    }
}

export async function updateAppointment(values: AppointmentSchemaType, appointmentDataId: string) {
    try {
        const { data } = await axios.put<ResponseModel<Appointment>>(`/api/appointment/${appointmentDataId}`, values);

        if (data.error) {
            throw data.data;
        }

        return data.data;
    }
    catch (error) {
        console.log('Falha ao atualizar agendamento - ', error);
        throw error;
    }
}