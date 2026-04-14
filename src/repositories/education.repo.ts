import type { Education, EducationInput } from "@/@types/education";
import { db } from "@/db";
import { educations } from "@/db/schema";
import { eq } from "drizzle-orm";

async function create(input: EducationInput) {
    return await db.insert(educations).values(input);
}

async function getByProfileId(profileId: number): Promise<Education[]> {
    const items = await db.select().from(educations).where(eq(educations.profileId, profileId));
    return items;
}

async function update(id: number, input: EducationInput) {
    return await db.update(educations)
        .set(input)
        .where(eq(educations.id, id));
}

async function remove(id: number) {
    return await db.delete(educations).where(eq(educations.id, id));
}

async function getById(id: number): Promise<Education> {
    const item = await db.select().from(educations).where(eq(educations.id, id)).limit(1);

    if (!item[0]) throw new Error('record not found');

    return item[0];
}

const educationRepo = {
    create,
    getByProfileId,
    update,
    remove,
    getById
}
export default educationRepo;
