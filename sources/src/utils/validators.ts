type Validator<T> = (value: T[keyof T], values: T) => string | undefined;

export const required =
  (message = "Ce champ est requis."): Validator<Record<string, string>> =>
  (value) =>
    !value ? message : undefined;

export const isEmail =
  (message = "Veuillez saisir un email valide."): Validator<Record<string, string>> =>
  (value) =>
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? message : undefined;

export const minLength =
  (length: number, message?: string): Validator<Record<string, string>> =>
  (value) =>
    value.length < length ? (message ?? `Ce champ doit contenir au moins ${length} caractères.`) : undefined;


