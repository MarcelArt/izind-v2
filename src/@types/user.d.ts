import type { RecordId } from 'surrealdb';
import z from 'zod';

export interface User {
  id: number;
  username: string;
}

export const RegisterInputSchema = z
  .object({
    username: z.string().min(16, 'NIK must be at least 16 characters long'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters long'),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['password'],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });
export type RegisterInput = z.infer<typeof RegisterInputSchema>;

export const LoginInputSchema = z.object({
  username: z.string().min(16, 'NIK must be at least 16 characters long'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});
export type LoginInput = z.infer<typeof LoginInputSchema>;

export type LoginResponse = {
  token: string;
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
  } & {
    username: string;
    displayUsername: string;
  };
};
