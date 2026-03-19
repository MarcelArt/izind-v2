import { getSession } from "@/functions/auth.fn";
import { redirect, type ParsedLocation } from '@tanstack/react-router'

export const requireAuth = async ({ location }: { location: ParsedLocation<{}> }) => {
  const session = await getSession();

  if (!session) {
    throw redirect({
      to: '/auth/login',
      search: { redirect: location.href },
    });
  }

  return { user: session.user };
};

export const authenticated = async ({ location }: { location: ParsedLocation<{}> }) => {
  const session = await getSession();

  if (session) {
    throw redirect({
      to: '/me/profile',
      search: { redirect: location.href },
    });
  }
};