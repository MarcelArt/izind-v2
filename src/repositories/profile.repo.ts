import type { Profile, ProfileInput } from "@/@types/profile";
import { db } from "@/db";
import { profiles } from "@/db/schema";
import { eq } from "drizzle-orm";

async function getByUserId(userId: string): Promise<Profile> {
    const profile = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1);

    if (!profile[0]) throw new Error('record not found');

    return profile[0] ?? {
        address: '',
        bloodType: 'O',
        city: '',
        createdAt: new Date(),
        dateOfBirth: new Date(),
        district: '',
        gender: 'L',
        id: 0,
        job: '',
        maritalStatus: '',
        name: '',
        nationality: '',
        nik: '',
        placeOfBirth: '',
        religion: '',
        rt: '',
        rw: '',
        userId: '',
        village: '',
        updatedAt: new Date(),
    }
}

async function create(input: ProfileInput) {
    return await db.insert(profiles)
        .values(input);
}

async function update(id: number, input: ProfileInput) {
    return await db.update(profiles)
        .set(input)
        .where(eq(profiles.id, id));
}

const profileRepo = {
    getByUserId,
    create,
    update,
}
export default profileRepo;