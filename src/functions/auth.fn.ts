import type { LoginInput, RegisterInput } from '@/@types/user';
import { auth } from '@/lib/auth';
import { createServerFn } from '@tanstack/react-start';
import { getRequestHeaders } from "@tanstack/react-start/server";

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
      },
    });
    console.log('user :>> ', user);
  });

export const loginUser = createServerFn({ method: 'POST' })
  .inputValidator((data: LoginInput) => data)
  .handler(async ({ data }) => {
    const user = await auth.api.signInUsername({
      body: data,
    });

    return user;
  });

export const getSession = createServerFn({ method: 'GET' }).handler(async () => {
  const headers = getRequestHeaders();
  const session = await auth.api.getSession({ headers });
  return session;
});
export const ensureSession = createServerFn({ method: 'GET' }).handler(async () => {
  const headers = getRequestHeaders();
  const session = await auth.api.getSession({ headers });
  if (!session) {
    throw new Error('Unauthorized');
  }
  return session;
});
