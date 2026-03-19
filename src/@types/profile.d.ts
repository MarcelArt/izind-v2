import type { RecordId } from "surrealdb";
import z from "zod";

type Gender = 'L' | 'P';

type BloodType = 'A' | 'B' | 'AB' | 'O';

export interface Profile {
    id: number;
    nik: string;
    name: string;
    place_of_birth: string;
    date_of_birth?: Date;
    gender?: Gender;
    address: string;
    rt: string;
    rw: string;
    village: string;
    district: string;
    city: string;
    religion: string;
    marital_status: string;
    job: string;
    nationality: string;
    blood_type?: BloodType;
    user_id: number;
}

export const ProfileInputSchema = z.object({
    nik: z.string().min(16, 'NIK must be at least 16 characters long'),
    name: z.string(),
    place_of_birth: z.string(),
    date_of_birth: z.string(),
    gender: z.enum(['L', 'P']),
    address: z.string(),
    rt: z.string(),
    rw: z.string(),
    village: z.string(),
    district: z.string(),
    city: z.string(),
    religion: z.string(),
    marital_status: z.string(),
    job: z.string(),
    nationality: z.string(),
    blood_type: z.enum(['A', 'B', 'AB', 'O']),
});
export type ProfileInput = z.infer<typeof ProfileInputSchema>;