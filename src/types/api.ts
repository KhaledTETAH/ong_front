export interface ApiEnvelope<T> {
  success: true;
  status_code: number;
  message: string;
  data: T;
}