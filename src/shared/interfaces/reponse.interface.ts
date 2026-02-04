export interface ApiResponse<T> {
  data: T;
  status: string;
  statusCode: number;
  message: string;
}