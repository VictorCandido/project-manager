'use server';

import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { AppointmentSchemaType } from "@/schemas/AppointmentSchema";

export async function listAppointments() {
    const profile = await currentProfile();

    try {
        const appointments = await db.appointment.findMany({
            where: {
                profileId: profile.id
            },
            include: { customer: true },
            orderBy: { date: 'desc' },
        });

        return appointments;
    } catch (error) {
        console.log('Falha ao listar agendamentos - ', error);
        throw error;
    }
}

export async function listAppointmentsByCustomer(customerId: string) {
    try {
        const appointments = await db.appointment.findMany({
            where: {
                customerId
            },
            include: { customer: true },
            orderBy: { date: 'desc' },
        });

        return appointments;
    } catch (error) {
        console.log('Falha ao listar agendamentos por clientes - ', error);
        throw error;
    }
}

export async function createAppointment(values: AppointmentSchemaType) {
    const profile = await currentProfile();

    try {
        const { date, description, customer, start, end } = values;

        const newAppointment = await db.appointment.create({
            data: {
                customerId: customer,
                date,
                description,
                end,
                start,
                profileId: profile.id
            }
        });

        return newAppointment;
    }
    catch (error) {
        console.log('Falha ao registrar agendamento - ', error);
        throw error;
    }
}

export async function updateAppointment(values: AppointmentSchemaType, appointmentId: string) {
    const profile = await currentProfile();

    try {
        const { date, description, customer, start, end } = values;

        const updatedAppointment = await db.appointment.update({
            where: {
                id: appointmentId,
                profileId: profile.id
            },
            data: {
                customerId: customer,
                date,
                description,
                end,
                start,
                profileId: profile.id
            }
        });

        return updatedAppointment;
    }
    catch (error) {
        console.log('Falha ao atualizar agendamento - ', error);
        throw error;
    }
}

export async function deleteAppointment(appointmentId: string) {
    const profile = await currentProfile();

    try {
        const deletedAppointment = await db.appointment.delete({
            where: {
                id: appointmentId,
                profileId: profile.id
            }
        });

        return deletedAppointment;
    }
    catch (error) {
        console.log('Falha ao deletar agendamento - ', error);
        throw error;
    }
}