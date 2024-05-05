'use server';

import { db } from "@/lib/db";

export async function getProfileByUserId(userId: string) {
    try {
        const profile = await db.profile.findUnique({
            where: { userId }
        });

        return profile;
    } catch (error) {
        console.log('Falha ao buscar perfil - ', error);
        throw error;
    }
}