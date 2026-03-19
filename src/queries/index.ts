export interface MutationCallbacks<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}
