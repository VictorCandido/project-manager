import { Appointment } from "@prisma/client";
import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import ResponseModel, { CodeResponseEnum } from "@/models/ResponseModel";

export async function PUT(req: Request, { params }: { params: { appointmentId: string }}) {
    let response: ResponseModel<Appointment | any>;

    try {
        const profile = await currentProfile();

        console.log('#### UPDATE APPOINTMENT profile', profile);

        const { customer, date, start, end, description } = await req.json();

        if (!profile) {
            response = new ResponseModel(true, CodeResponseEnum.UNAUTHORIZED, 'Sem permissão para realizar tarefa.', {});
            return NextResponse.json(response, { status: response.code});
        }

        if (!params.appointmentId) {
            response = new ResponseModel(true, CodeResponseEnum.BAD_REQUEST, 'Necessário informar ID do apontamento', {});
            return NextResponse.json(response, { status: response.code});
        }

        const newAppointment = await db.appointment.update({
            where: {
                id: params.appointmentId,
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

        response = new ResponseModel(false, CodeResponseEnum.CREATED, 'Apontamento criado.', newAppointment);
    } catch (error) {
        console.log('[ERROR] POST Appointment - ', error);
        response = new ResponseModel(true, CodeResponseEnum.INTERNAL_ERROR, 'Falha ao criar apontamento.', error);
    }

    return NextResponse.json(response, { status: response.code});
}