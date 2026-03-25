import { getProfileByUserId, upsertProfile } from "@/functions/profile.fn";
import { mutationOptions, queryOptions } from "@tanstack/react-query";
import type { MutationCallbacks } from ".";
import type { ProfileInput } from "@/@types/profile";

export function getProfileByUserIdOption(userId: string) {
    return queryOptions({
        queryKey: ['profile-by-user-id', userId],
        queryFn: () => getProfileByUserId({ data: userId }),
    });
}

export function upsertProfileOption({ onSuccess, onError }: MutationCallbacks<void>) {
    return mutationOptions({
        mutationFn: (data: { id?: number, input: ProfileInput }) => upsertProfile({ data }),
        onSuccess,
        onError,
    });
}