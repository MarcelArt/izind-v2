import { getDocumentsByProfileId, getDocumentById, createDocument, updateDocument, deleteDocument } from "@/functions/document.fn";
import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { QUERY_KEYS, type MutationCallbacks } from ".";
import type { DocumentInput } from "@/@types/document";

export function getDocumentsByProfileIdOption(profileId: number) {
    return queryOptions({
        queryKey: [QUERY_KEYS.MY_DOCUMENTS, profileId],
        queryFn: () => getDocumentsByProfileId({ data: profileId }),
    });
}

export function getDocumentByIdOption(id: number) {
    return queryOptions({
        queryKey: [QUERY_KEYS.ONE_DOCUMENT, id],
        queryFn: () => getDocumentById({ data: id }),
    });
}

export function createDocumentOption({ onSuccess, onError }: MutationCallbacks<void>) {
    return mutationOptions({
        mutationFn: (input: DocumentInput) => createDocument({ data: input }),
        onSuccess,
        onError,
    });
}

export function updateDocumentOption({ onSuccess, onError }: MutationCallbacks<void>) {
    return mutationOptions({
        mutationFn: (data: { id: number; input: DocumentInput }) => updateDocument({ data }),
        onSuccess,
        onError,
    });
}

export function deleteDocumentOption({ onSuccess, onError }: MutationCallbacks<void>) {
    return mutationOptions({
        mutationFn: (id: number) => deleteDocument({ data: id }),
        onSuccess,
        onError,
    });
}
