import { requestInfo } from "./info";

export type responseStatus = "success" | "error" | "fail";

export interface apiSuccessResponse<T extends null | object> {
  status: "success";
  data: T;
}

export interface apiFailResponse {
  status: "fail";
  data: requestInfo & {
    errors: string[] | [string, string][];
  };
}

export interface apiErrorResponse {
  status: "error";
  message: string;
  data: requestInfo & {
    errors: string[];
  };
}

export type apiResponse<T extends null | object = object | null> =
  | apiSuccessResponse<T>
  | apiFailResponse
  | apiErrorResponse;
