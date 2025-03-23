import { requestInfo } from "./info";
import { ErrorResponse } from "../auth";

export type ResponseStatus = "success" | "error" | "fail";

export interface apiSuccessResponse<T> {
  // Removed 'extends null | object'
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

export type apiResponse<T = unknown> = // Changed default to unknown
  apiSuccessResponse<T> | apiFailResponse | apiErrorResponse | ErrorResponse;
