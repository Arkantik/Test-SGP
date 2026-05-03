export interface LoginFormValues extends Record<string, string> {
  email: string;
  password: string;
}

export type FormErrors = Partial<Record<keyof LoginFormValues, string>>;

export type ApiResponse<T> = { ok: true; data: T } | { ok: false; error: ApiError };

export interface ApiError {
  code: string;
  message: string;
}

export interface LoginSuccessData {
  /** Token JWT ou session renvoyé par le backend */
  token: string;
  user: { email: string };
}
