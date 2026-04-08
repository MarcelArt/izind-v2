import type { documents } from "@/db/schema";
import z from "zod";

export type Document = typeof documents.$inferSelect;

export const DocumentInputSchema = z.object({
    filename: z.string(),
    path: z.string(),
    type: z.string(),
    tags: z.array(z.string()),
    profileId: z.number(),
});
export type DocumentInput = z.infer<typeof DocumentInputSchema>;