import axios from "axios";
import { Customer } from "@prisma/client";

import ResponseModel from "@/models/ResponseModel";
import { CustomerSchemaType } from "@/schemas/CustomerSchema";

export async function createCustomer(values: CustomerSchemaType) {
    try {
        const { data } = await axios.post<ResponseModel<Customer>>("/api/customer", values);

        if (data.error) {
            throw data.data;
        }

        return data.data;
    } catch (error) {
        console.log('Falha ao registrar cliente - ', error);
        throw error;
    }
}

export async function updateCustomer(values: CustomerSchemaType, customerDataId: string) {
    try {
        const { data } = await axios.put<ResponseModel<Customer>>(`/api/customer/${customerDataId}`, values);

        if (data.error) {
            throw data.data;
        }

        return data.data;
    } catch (error) {
        console.log('Falha ao atualizar cliente - ', error);
        throw error;
    }
}