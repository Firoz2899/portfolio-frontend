import type { ApiResponse } from "@/types/common.types";
import {apiUrls} from '@/constants'
import { api } from "@/services";
import type { ICreateSubSkillRes, ISkill } from "@/types/data.types";

const {profiles, skills, UniqueCodekeys} = apiUrls

export const skillApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createSkill: builder.mutation<ApiResponse<ISkill>, {Title: string, Icon: string}>({
      query: (data) => ({
        url: skills.createSkill,
        method: "POST",
        data
      })
    }),
    updateSkill: builder.mutation<ApiResponse<ISkill>, ISkill>({
      query: (data) => ({
        url: skills.updateSkill.replace(UniqueCodekeys.unique, data.UniqueCode),
        method: "PUT",
        data
      })
    }),
    deleteSkill: builder.mutation<ApiResponse<{uniqueCode: string}>, {uniqueCode: string}>({
      query: ({uniqueCode}) => ({
        url: skills.deleteSkill.replace(UniqueCodekeys.unique, uniqueCode),
        method: "DELETE",
      })
    }),
    createSubSkill: builder.mutation<ApiResponse<ICreateSubSkillRes>, {Category: string, Name: string, Percentage: number}>({
      query: (data) => ({
        url: skills.createSubSkill.replace(UniqueCodekeys.unique, data.Category),
        method: "POST",
        data
      })
    }),
    updateTechnology: builder.mutation<ApiResponse<string[]>, {Technologies: string[]}>({
      query: (data) => ({
        url: profiles.updateTechnologies,
        method: "PUT",
        data
      })
    })
  }),
});

export const skillApiHooks = skillApi;