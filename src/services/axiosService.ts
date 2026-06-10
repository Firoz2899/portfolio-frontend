
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import {axiosInstance} from "@/services";
import type { ApiResponse } from "@/types/common.types";

interface IAxiosBaseQuery {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'FETCH' | 'PATCH';
  data?: any;
  params?: Record<string, string>
}

// export const axiosBaseQuery = (): BaseQueryFn<
//   IAxiosBaseQuery | string,
//   ApiResponse,
//   {
//     status?: number;
//     data?: ApiResponse;
//   }
// > => async (payload) => {
//     const { url, method, data, params } = typeof payload === "string" ? {
//       url: payload,
//       method: 'GET' as const,
//       data: undefined,
//       params: undefined
//     } : payload;

//     try {
//       const result = await axiosInstance({
//         url,
//         method,
//         data,
//         params,
//       });
      
//       return { data: result.data };
//     } catch (axiosError: any) {
//       return {
//         error: {
//           status: axiosError.response?.status,
//           data: axiosError.response?.data || axiosError.message,
//         },
//       };
//     }
//   };


export const axiosBaseQuery = (): BaseQueryFn<
  IAxiosBaseQuery | string,
  ApiResponse,
  {
    status?: number;
    data?: ApiResponse;
  }
> => {
  return async (payload) => {
    const request =
      typeof payload === "string"
        ? {
            url: payload,
            method: "GET" as const,
          }
        : payload;

    try {
      const response = await axiosInstance({
        url: request.url,
        method: request.method,
        data: request.data,
        params: request.params,
      });

      const res = response.data;

      const normalizedResponse: ApiResponse =
        res &&
        typeof res === "object" &&
        "IsSuccess" in res &&
        "Message" in res &&
        "Data" in res
          ? res
          : {
              IsSuccess: true,
              Message: "Success",
              Data: res,
            };

      return {
        data: normalizedResponse,
      };
    } catch (error: any) {
      return {
        error: {
          status: error.response?.status,
          data: {
            IsSuccess: false,
            Message:
              error.response?.data?.Message ??
              error.message ??
              "Something went wrong",
            Data: null,
            ErrorType: error.response?.data?.ErrorType,
          } as ApiResponse,
        },
      };
    }
  };
};

export async function executeMutation<T>(
  promise: Promise<ApiResponse<T>>
): Promise<ApiResponse<T>> {
  try {
    return await promise;
  } catch (error: any) {
    return error?.data;
  }
}