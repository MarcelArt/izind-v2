import { registerUser } from "@/functions/auth.fn";
import type { MutationCallbacks } from ".";
import type { RegisterInput } from "@/@types/user";
import { mutationOptions } from "@tanstack/react-query";

export function registerMutation({ onSuccess, onError }: MutationCallbacks<void>) {
  return mutationOptions({
    mutationFn: (input: RegisterInput) => registerUser({ data: input }),
    onSuccess,
    onError,
  });
}