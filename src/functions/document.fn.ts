import type { DocumentInput } from '@/@types/document';
import documentRepo from '@/repositories/document.repo';
import { createServerFn } from '@tanstack/react-start';

export const getDocumentsByProfileId = createServerFn({ method: 'GET' })
  .inputValidator((profileId: number) => profileId)
  .handler(async ({ data: profileId }) => {
    const documents = await documentRepo.getByProfileId(profileId);
    return documents;
  });

export const getDocumentById = createServerFn({ method: 'GET' })
  .inputValidator((id: number) => id)
  .handler(async ({ data: id }) => {
    const document = await documentRepo.getById(id);
    return document;
  });

export const createDocument = createServerFn({ method: 'POST' })
  .inputValidator((input: DocumentInput) => input)
  .handler(async ({ data: input }) => {
    await documentRepo.create(input);
  });

export const updateDocument = createServerFn({ method: 'POST' })
  .inputValidator((data: { id: number; input: DocumentInput }) => data)
  .handler(async ({ data }) => {
    await documentRepo.update(data.id, data.input);
  });

export const deleteDocument = createServerFn({ method: 'POST' })
  .inputValidator((id: number) => id)
  .handler(async ({ data: id }) => {
    await documentRepo.remove(id);
  });
