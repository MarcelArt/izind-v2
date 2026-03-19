import type { RegisterInput } from '@/@types/user';
import { auth } from '@/lib/auth';
import { createServerFn } from '@tanstack/react-start';

export const registerUser = createServerFn({ method: 'POST' })
  .inputValidator((data: RegisterInput) => data)
  .handler(async ({ data }) => {
    const user = await auth.api.signUpEmail({
        body: {
            email: `${data.username}@yopmail.com`,
            password: data.password,
            name: data.username,
            username: data.username,
            displayUsername: data.username,
        }
    });
    console.log('user :>> ', user);
  });
