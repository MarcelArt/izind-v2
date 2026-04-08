import type { Document, DocumentInput } from "@/@types/document";
import { db } from "@/db";
import { documents } from "@/db/schema";
import { eq } from "drizzle-orm";

async function create(input: DocumentInput) {
    return await db.insert(documents).values(input);
}

async function getByProfileId(profileId: number): Promise<Document[]> {
    const docs = await db.select().from(documents).where(eq(documents.profileId, profileId));
    return docs;
}

async function update(id: number, input: DocumentInput) {
    return await db.update(documents)
        .set(input)
        .where(eq(documents.id, id));
}

async function remove(id: number) {
    return await db.delete(documents).where(eq(documents.id, id));
}

async function getById(id: number): Promise<Document> {
    const doc = await db.select().from(documents).where(eq(documents.id, id)).limit(1);

    if (!doc[0]) throw new Error('record not found');

    return doc[0];
}

const documentRepo = {
    create,
    getByProfileId,
    update,
    remove,
    getById
}
export default documentRepo;