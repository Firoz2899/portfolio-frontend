import {apiUrls} from '@/constants'
import {api} from '@/services'
import type { ApiResponse } from "@/types/common.types";
import type { ISlugValidate } from "@/types/payload.types";
import type { slugValidateRes } from "@/types/data.types";

export const slugApi = api.injectEndpoints({
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
})

export const slugApiHooks = slugApi;