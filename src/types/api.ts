export type ApiResponse<T> = {
  statusCode: string;
  message: string;
  errorMessage: string | null;
  data: T;
};

export type LoginResponseData = {
  token: string;
};

export type Note = {
  id: string;
  title: string;
  body: string;
  owner: string;
  archived: boolean;
  createdAt: string;
};
