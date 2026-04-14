import type { educations } from "@/db/schema";
import z from "zod";

export type Education = typeof educations.$inferSelect;

export const EducationInputSchema = z.object({
    school: z.string(),
    degree: z.string(),
    fieldOfStudy: z.string(),
    startDate: z.date(),
    endDate: z.date().optional(),
    grade: z.string().optional(),
    maxGrade: z.string().optional(),
    description: z.string().optional(),
    documentId: z.number(),
    profileId: z.number(),
});
export type EducationInput = z.infer<typeof EducationInputSchema>;
