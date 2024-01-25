import { Customer } from "@prisma/client";
import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import ResponseModel, { CodeResponseEnum } from "@/models/ResponseModel";

export async function PUT(req: Request, { params }: { params: { customerId: string } }) {
    let response: ResponseModel<Customer | any>;

    try {
        const profile = await currentProfile();
        const { name, imageUrl } = await req.json();

        if (!profile) {
            response = new ResponseModel(true, CodeResponseEnum.UNAUTHORIZED, 'Sem permissão para realizar tarefa.', {});
            return NextResponse.json(response, { status: response.code });
        }

        if (!params.customerId) {
            response = new ResponseModel(true, CodeResponseEnum.BAD_REQUEST, 'Necessário informar ID do cliente', {});
            return NextResponse.json(response, { status: response.code });
        }

        const updatedCustomer = await db.customer.update({
            where: { id: params.customerId },
            data: { name, imageUrl }
        });

        response = new ResponseModel(false, CodeResponseEnum.CREATED, 'Cliente atualizado.', updatedCustomer);
    } catch (error) {
        console.log('[ERROR] POST Customer - ', error);
        response = new ResponseModel(true, CodeResponseEnum.INTERNAL_ERROR, 'Falha ao atualizar cliente.', error);
    }

    return NextResponse.json(response, { status: response.code });
}

export async function DELETE(req: Request, { params }: { params: { customerId: string } }) {
    let response: ResponseModel<Customer | any>;

    try {
        const profile = await currentProfile();

        if (!profile) {
            response = new ResponseModel(true, CodeResponseEnum.UNAUTHORIZED, 'Sem permissão para realizar tarefa.', {});
            return NextResponse.json(response, { status: response.code });
        }

        if (!params.customerId) {
            response = new ResponseModel(true, CodeResponseEnum.BAD_REQUEST, 'Necessário informar ID do cliente', {});
            return NextResponse.json(response, { status: response.code });
        }

        const deletedCustomer = await db.customer.delete({
            where: { id: params.customerId }
        });

        response = new ResponseModel(false, CodeResponseEnum.CREATED, 'Cliente deletado.', deletedCustomer);
    } catch (error) {
        console.log('[ERROR] POST Customer - ', error);
        response = new ResponseModel(true, CodeResponseEnum.INTERNAL_ERROR, 'Falha ao deletar cliente.', error);
    }

    return NextResponse.json(response, { status: response.code });
}