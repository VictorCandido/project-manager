import { db } from "@/lib/db";
import ResponseModel, { CodeResponseEnum } from "@/models/ResponseModel";
import { auth } from "@clerk/nextjs";
import { Customer } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const {userId, getToken} = auth();
    let response: ResponseModel<Customer[] | any>;
    
    try {
        console.log('### userId', userId);
    
        if (!userId) {
            response = new ResponseModel(true, CodeResponseEnum.UNAUTHORIZED, '', {});  
            return NextResponse.json(response, { status: response.code });
        }

        // const token = await getToken({template: "supabase"});
        // console.log('### token', token);

        const customers = await db.customer.findMany();
        response = new ResponseModel(false, CodeResponseEnum.OK, 'OK', customers);
    } catch (error: any) {
        console.log('[ERROR] GET Customer - ', error);
        response = new ResponseModel(true, CodeResponseEnum.INTERNAL_ERROR, 'Falha ao listar clientes', error);
    }

    return NextResponse.json(response, { status: response.code });
}

// export async function POST(req: Request) {
//     try {
//         const 
//     } catch (error) {
        
//     }
// }