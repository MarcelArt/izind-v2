import type { BloodTypes, Genders, profiles } from "@/db/schema";
import type { RecordId } from "surrealdb";
import z from "zod";

export type Gender = (typeof Genders)[number];
export type BloodType = (typeof BloodTypes)[number];
export type Profile = typeof profiles.$inferSelect;

export const ProfileInputSchema = z.object({
    nik: z.string().min(16, 'NIK must be at least 16 characters long'),
    name: z.string(),
    placeOfBirth: z.string(),
    dateOfBirth: z.date(),
    dateOfBirthStr: z.string(),
    gender: z.enum(['L', 'P']),
    address: z.string(),
    rt: z.string(),
    rw: z.string(),
    village: z.string(),
    district: z.string(),
    city: z.string(),
    religion: z.string(),
    maritalStatus: z.string(),
    job: z.string(),
    nationality: z.string(),
    bloodType: z.enum(['A', 'B', 'AB', 'O']),
    userId: z.string(),
});
export type ProfileInput = z.infer<typeof ProfileInputSchema>;