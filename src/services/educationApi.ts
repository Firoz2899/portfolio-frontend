import type { ApiResponse } from "@/types/common.types";
import {apiUrls} from '@/constants'
import { api } from "@/services";
import type { IEducation } from "@/types/data.types";

const {educations, UniqueCodekeys} = apiUrls

export const educationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createEducation: builder.mutation<ApiResponse<IEducation>, IEducation>({
      query: (data) => ({
        url: educations.createEducation,
        method: "POST",
        data
      })
    }),
    updateEducation: builder.mutation<ApiResponse<IEducation>, IEducation>({
      query: (data) => ({
        url: educations.updateEducation.replace(UniqueCodekeys.unique, data.UniqueCode!),
        method: "PUT",
        data
      })
    }),
    deleteEducation: builder.mutation<ApiResponse<{EducationUniqueCode: string}>, string>({
      query: (UniqueCode) => ({
        url: educations.deleteEducation.replace(UniqueCodekeys.unique, UniqueCode),
        method: "DELETE",
      })
    })
  }),
});

export const educationApiHooks = educationApi;