import {apiUrls} from '@/constants'
import {api, profileApi} from '@/services'
import type {ISignIn, ISignup, IVerifyEmail} from '@/types/payload.types'
import type { ApiResponse } from "@/types/common.types";
import type { ISigninRes, IUser } from "@/types/data.types";

export const authApi = api.injectEndpoints({
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
      invalidatesTags: ["Signin"], // use this for auto trigger that api which has this tag as providesTags
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data.IsSuccess) {
            dispatch(
              authApi.endpoints.me.initiate(undefined, {
                forceRefetch: true,
              })
            );
            dispatch(
              profileApi.endpoints.getUserProfile.initiate(undefined, {
                forceRefetch: true,
              })
            );
          }
        } catch {
          // Ignore login failures
        }
      }
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

    me: builder.query<ApiResponse<{user: IUser}>, void>({
      query: () => apiUrls.auth.me,
      providesTags: ["User"],
    }),

    logout: builder.mutation<ApiResponse<unknown>, void>({
      query: () => ({
        url: apiUrls.auth.logout,
        method: "POST",
      }),
    }),
  }),
});

export const authApiHooks = authApi;