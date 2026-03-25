export type Option<T> = {
  data: T;
  none: false;
} | {
  data?: T;
  none: true;
};
