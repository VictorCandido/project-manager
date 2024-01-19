import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import ResponseModel, { CodeResponseEnum } from "@/models/ResponseModel";
import { Customer } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    let response: ResponseModel<Customer[] | any>;

    try {
        const customers = await db.customer.findMany();
        response = new ResponseModel(false, CodeResponseEnum.OK, 'OK', customers);
    } catch (error: any) {
        console.log('[ERROR] GET Customer - ', error);
        response = new ResponseModel(true, CodeResponseEnum.INTERNAL_ERROR, 'Falha ao listar clientes', error);
    }

    return NextResponse.json(response, { status: response.code });
}

export async function POST(req: Request) {
    let response: ResponseModel<Customer | any>;

    try {
        const profile = await currentProfile();
        const { name } = await req.json();

        if (!profile) {
            response = new ResponseModel(true, CodeResponseEnum.UNAUTHORIZED, 'Sem permissão para realizar tarefa.', {});
            return NextResponse.json(response, { status: response.code });
        }

        const newCustomer = await db.customer.create({
            data: {
                name,
            }
        });

        response = new ResponseModel(false, CodeResponseEnum.CREATED, 'Cliente criado.', newCustomer);
    } catch (error) {
        console.log('[ERROR] POST Customer - ', error);
        response = new ResponseModel(true, CodeResponseEnum.INTERNAL_ERROR, 'Falha ao criar cliente.', error);
    }

    return NextResponse.json(response, { status: response.code });
}