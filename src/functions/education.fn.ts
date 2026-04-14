import type { EducationInput } from '@/@types/education';
import educationRepo from '@/repositories/education.repo';
import { createServerFn } from '@tanstack/react-start';

export const getEducationsByProfileId = createServerFn({ method: 'GET' })
  .inputValidator((profileId: number) => profileId)
  .handler(async ({ data: profileId }) => {
    const items = await educationRepo.getByProfileId(profileId);
    return items;
  });

export const getEducationById = createServerFn({ method: 'GET' })
  .inputValidator((id: number) => id)
  .handler(async ({ data: id }) => {
    const item = await educationRepo.getById(id);
    return item;
  });

export const createEducation = createServerFn({ method: 'POST' })
  .inputValidator((input: EducationInput) => input)
  .handler(async ({ data: input }) => {
    await educationRepo.create(input);
  });

export const updateEducation = createServerFn({ method: 'POST' })
  .inputValidator((data: { id: number; input: EducationInput }) => data)
  .handler(async ({ data }) => {
    await educationRepo.update(data.id, data.input);
  });

export const deleteEducation = createServerFn({ method: 'POST' })
  .inputValidator((id: number) => id)
  .handler(async ({ data: id }) => {
    await educationRepo.remove(id);
  });
