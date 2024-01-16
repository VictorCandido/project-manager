import { db } from "@/lib/db";
import ResponseModel, { CodeResponseEnum } from "@/models/ResponseModel";
import { Appointment } from "@prisma/client";
import { NextResponse } from "next/server";
import _ from 'lodash';
import { currentProfile } from "@/lib/currentProfile";


export async function GET(req: Request) {
    let response: ResponseModel<Appointment | any>;
    
    try {
        const profile = await currentProfile();

        if (!profile) {
            response = new ResponseModel(true, CodeResponseEnum.UNAUTHORIZED, '', {});
            return NextResponse.json(response, { status: response.code});
        }
        
        const appointments = await db.appointment.findMany({ 
            where: {
                profileId: profile.id
            },
            include: { customer: true },
            orderBy: { date: 'desc' },
        });

        // response = new ResponseModel(false, CodeResponseEnum.OK, 'OK', _.groupBy(appointments, 'date'));
        response = new ResponseModel(false, CodeResponseEnum.OK, 'OK', appointments);
    } catch (error) {
        console.log('[ERROR] GET Appointment - ', error);
        response = new ResponseModel(true, CodeResponseEnum.INTERNAL_ERROR, 'Falha ao listar apontamentos', error);
    }

    return NextResponse.json(response, { status: response.code});
}

export async function POST(req: Request) {
    let response: ResponseModel<Appointment | any>;

    try {
        const profile = await currentProfile();
        const { customer, date, start, end, description } = await req.json();

        if (!profile) {
            response = new ResponseModel(true, CodeResponseEnum.UNAUTHORIZED, '', {});
            return NextResponse.json(response, { status: response.code});
        }

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

        response = new ResponseModel(false, CodeResponseEnum.CREATED, 'Apontamento criado', newAppointment);
    } catch (error) {
        console.log('[ERROR] POST Appointment - ', error);
        response = new ResponseModel(true, CodeResponseEnum.INTERNAL_ERROR, 'Falha ao criar apontamento', error);
    }

    return NextResponse.json(response, { status: response.code});
}

export async function PUT(req: Request) {
    let response: ResponseModel<Appointment | any>;

    try {
        const profile = await currentProfile();
        const { customer, date, start, end, description } = await req.json();

        if (!profile) {
            response = new ResponseModel(true, CodeResponseEnum.UNAUTHORIZED, '', {});
            return NextResponse.json(response, { status: response.code});
        }

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

        response = new ResponseModel(false, CodeResponseEnum.CREATED, 'Apontamento criado', newAppointment);
    } catch (error) {
        console.log('[ERROR] POST Appointment - ', error);
        response = new ResponseModel(true, CodeResponseEnum.INTERNAL_ERROR, 'Falha ao criar apontamento', error);
    }

    return NextResponse.json(response, { status: response.code});
}