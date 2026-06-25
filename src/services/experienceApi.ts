import type { ApiResponse } from "@/types/common.types";
import {apiUrls} from '@/constants'
import { api } from "@/services";
import type { IExperience } from "@/types/data.types";

const {experiences, UniqueCodekeys} = apiUrls

export const experienceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createExperience: builder.mutation<ApiResponse<IExperience>, {Title: string, Icon: string}>({
      query: (data) => ({
        url: experiences.createExperience,
        method: "POST",
        data
      })
    }),
    updateExperience: builder.mutation<ApiResponse<IExperience>, IExperience>({
      query: (data) => ({
        url: experiences.updateExperience.replace(UniqueCodekeys.unique, data.UniqueCode!),
        method: "PUT",
        data
      })
    }),
    deleteExperience: builder.mutation<ApiResponse<{ExperienceUniqueCode: string}>, {UniqueCode: string}>({
      query: ({UniqueCode}) => ({
        url: experiences.deleteExperience.replace(UniqueCodekeys.unique, UniqueCode),
        method: "DELETE",
      })
    })
  }),
});

export const experienceApiHooks = experienceApi;