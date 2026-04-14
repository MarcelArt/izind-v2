export interface MutationCallbacks<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

const MY_PROFILE = 'profile-by-user-id';

const MY_DOCUMENTS = 'documents-by-profile-id';
const ONE_DOCUMENT = 'document-by-id';

const MY_EDUCATIONS = 'educations-by-profile-id';
const ONE_EDUCATION = 'education-by-id';

export const QUERY_KEYS = {
  MY_PROFILE,
  MY_DOCUMENTS,
  ONE_DOCUMENT,
  MY_EDUCATIONS,
  ONE_EDUCATION
};