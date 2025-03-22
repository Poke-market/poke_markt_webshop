import { requestInfo } from "./info";
import { ErrorResponse } from "../auth";

export type ResponseStatus = "success" | "error" | "fail";

export type ApiSuccessResponse<T> = {
  status: "success";
  data: T;
};

export interface ApiFailResponse {
  status: "fail";
  data: requestInfo & {
    errors: Array<string | [string, string]>;
  };
}

export type ApiResponse<T = unknown> =
  | ApiSuccessResponse<T>
  | ApiFailResponse
  | ErrorResponse;
