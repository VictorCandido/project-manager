'use server';

import { CustomerSchemaType } from "@/schemas/customer-schema";
import { db } from "@/lib/db";

export async function listCustomers() {
    try {
        const customers = await db.customer.findMany();
        return customers;
    } catch (error) {
        console.log('Falha ao listar clientes - ', error);
        throw error;
    }
}

export async function createCustomer(values: CustomerSchemaType) {
    try {
        const { name, imageUrl } = values;

        const newCustomer = await db.customer.create({
            data: {
                name,
                imageUrl: imageUrl
            }
        });

        return newCustomer;
    } catch (error) {
        console.log('Falha ao registrar cliente - ', error);
        throw error;
    }
}

export async function updateCustomer(values: CustomerSchemaType, customerId: string) {
    try {
        const { name, imageUrl } = values;

        const updatedCustomer = await db.customer.update({
            where: { id: customerId },
            data: { name, imageUrl }
        });

        return updatedCustomer;
    } catch (error) {
        console.log('Falha ao atualizar cliente - ', error);
        throw error;
    }
}

export async function deleteCustomer(customerId: string) {
    try {
        const deletedCustomer = await db.customer.delete({
            where: { id: customerId }
        });

        return deletedCustomer;
    } catch (error) {
        console.log('Falha ao deletar cliente - ', error);
        throw error;
    }
}