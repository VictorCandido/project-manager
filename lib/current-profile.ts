'use server';

import { auth } from "@clerk/nextjs";
import { db } from "./db";
import { redirect } from "next/navigation";

export const currentProfile = async () => {
    const { userId } = auth();

    if (!userId) {
        return redirect('/');
    }

    const profile = await db.profile.findUnique({
        where: {
            userId
        }
    });

    if (!profile) {
        return redirect('/');
    }

    return profile;
}