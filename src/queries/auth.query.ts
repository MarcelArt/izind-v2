import { loginUser, registerUser } from "@/functions/auth.fn";
import type { MutationCallbacks } from ".";
import type { LoginInput, LoginResponse, RegisterInput } from "@/@types/user";
import { mutationOptions } from "@tanstack/react-query";

export function registerMutation({ onSuccess, onError }: MutationCallbacks<void>) {
  return mutationOptions({
    mutationFn: (input: RegisterInput) => registerUser({ data: input }),
    onSuccess,
    onError,
  });
}

export function loginMutation({ onSuccess, onError }: MutationCallbacks<LoginResponse>) {
  return mutationOptions({
    mutationFn: (input: LoginInput) => loginUser({ data: input }),
    onSuccess,
    onError,
  });
}