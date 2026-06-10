import { createApi } from "@reduxjs/toolkit/query/react";
import {apiUrls} from '@/constants'
import {axiosBaseQuery} from '@/services'
import type { ApiResponse } from "@/types/common.types";
import type { ISlugValidate } from "@/types/payload.types";
import type { slugValidateRes } from "@/types/data.types";



export const slugApi = createApi({
  reducerPath: "slugApi",

  baseQuery: axiosBaseQuery(),

  tagTypes: ["Slug"],

  endpoints: (builder) => ({
    validateSlug: builder.mutation<ApiResponse<slugValidateRes>, ISlugValidate>({
      query: (data) => ({
        url: apiUrls.slugs.checkSlugAvailability,
        method: "POST",
        data,
      }),
      // transformResponse: (response: ApiResponse<slugValidateRes>) => response.Data,
    })
  }),
});

export const {
    useValidateSlugMutation
} = slugApi;