import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { userId: string } }) {
    const profile = await currentProfile();

    if (!profile) {
        return new Response('Unauthorized', { status: 401 });
    }

    const { userId } = params;

    const searchedProfile = await db.profile.findUnique({
        where: {
            userId
        }
    });

    if (!searchedProfile) {
        return new Response('Profile not found', { status: 404 });
    }

    return NextResponse.json(searchedProfile);
}