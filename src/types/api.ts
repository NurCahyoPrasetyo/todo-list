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
  checklistCompletionStatus: boolean;
  id: number;
  items: null | string[];
  name: string;
};
