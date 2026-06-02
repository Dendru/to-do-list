export type MyPropsType = {
  modelValue: Date | null;
  allowedDates?: (val: unknown) => boolean;
  min?: string;
  max?: string;
};
