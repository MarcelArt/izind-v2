import { getEducationsByProfileId, getEducationById, createEducation, updateEducation, deleteEducation } from "@/functions/education.fn";
import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { QUERY_KEYS, type MutationCallbacks } from ".";
import type { EducationInput } from "@/@types/education";

export function getEducationsByProfileIdOption(profileId: number) {
    return queryOptions({
        queryKey: [QUERY_KEYS.MY_EDUCATIONS, profileId],
        queryFn: () => getEducationsByProfileId({ data: profileId }),
    });
}

export function getEducationByIdOption(id: number) {
    return queryOptions({
        queryKey: [QUERY_KEYS.ONE_EDUCATION, id],
        queryFn: () => getEducationById({ data: id }),
    });
}

export function createEducationOption({ onSuccess, onError }: MutationCallbacks<void>) {
    return mutationOptions({
        mutationFn: (input: EducationInput) => createEducation({ data: input }),
        onSuccess,
        onError,
    });
}

export function updateEducationOption({ onSuccess, onError }: MutationCallbacks<void>) {
    return mutationOptions({
        mutationFn: (data: { id: number; input: EducationInput }) => updateEducation({ data }),
        onSuccess,
        onError,
    });
}

export function deleteEducationOption({ onSuccess, onError }: MutationCallbacks<void>) {
    return mutationOptions({
        mutationFn: (id: number) => deleteEducation({ data: id }),
        onSuccess,
        onError,
    });
}
