export type UrlParams = {
  [key: string]: string | number | boolean;
};

export interface ApiResponseStatus<T = any> {
  valid: boolean;
  message: string;
  payload?: T;
}
