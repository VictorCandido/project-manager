import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const customers = await db.customer.findMany();
        return NextResponse.json(customers);
    } catch (error) {
        console.log('[ERROR] GET Customer - ', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

// export async function POST(req: Request) {
//     try {
//         const 
//     } catch (error) {
        
//     }
// }