import type { ProfileInput } from '@/@types/profile';
import profileRepo from '@/repositories/profile.repo';
import { createServerFn } from '@tanstack/react-start';

export const getProfileByUserId = createServerFn({ method: 'GET' })
  .inputValidator((userId: string) => userId)
  .handler(async ({ data: userId }) => {
    const profile = await profileRepo.getByUserId(userId);

    return profile;
  });

export const upsertProfile = createServerFn({ method: 'POST' })
  .inputValidator((data: { id?: number; input: ProfileInput }) => data)
  .handler(async ({ data: input }) => {
    if (input.id) {
      await profileRepo.update(input.id, input.input);
    } else {
      await profileRepo.create(input.input);
    }
  });
