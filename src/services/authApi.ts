import { createApi } from "@reduxjs/toolkit/query/react";
import {apiUrls} from '@/constants'
import {axiosBaseQuery} from '@/services'
import type {ISignIn, ISignup, IVerifyEmail} from '@/types/payload.types'
import type { ApiResponse } from "@/types/common.types";
import type { ISigninRes } from "@/types/data.types";

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: axiosBaseQuery(),

  tagTypes: ["User"],

  endpoints: (builder) => ({
    signup: builder.mutation<ApiResponse<any>, ISignup>({
      query: (data) => ({
        url: apiUrls.auth.signup,
        method: "POST",
        data,
      }),
    }),

    signIn: builder.mutation<ApiResponse<ISigninRes>, ISignIn>({
      query: (data) => ({
        url: apiUrls.auth.login,
        method: "POST",
        data,
      }),
    }),

    verifyEmail: builder.mutation<ApiResponse<any>, IVerifyEmail>({
      query: (data) => ({
        url: apiUrls.auth.verifyEmail,
        method: "POST",
        data,
      }),
    }),

    resendEmailOtp: builder.mutation<ApiResponse<any>, {Email: string;}>({
      query: (data) => ({
        url: apiUrls.auth.resendOtp,
        method: "POST",
        data,
      }),
    }),

    me: builder.query({
      query: () => apiUrls.auth.me,
      providesTags: ["User"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: apiUrls.auth.logout,
        method: "POST",
      }),
    }),
  }),
});

export const {
    useSignupMutation,
    useSignInMutation,
    useMeQuery,
    useVerifyEmailMutation,
    useResendEmailOtpMutation,
    useLogoutMutation
} = authApi;