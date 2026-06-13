import type { IProfile } from "@/types/data.types";
import type { ApiResponse } from "@/types/common.types";
import {apiUrls} from '@/constants'
import { api } from "@/services";

const {profiles, UniqueCodekeys} = apiUrls

export const profileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfileBySlug: builder.query<ApiResponse<IProfile>, string>({
      query: (slug) =>
        profiles.getProfileBySlug.replace(UniqueCodekeys.profile, slug),
    }),
    getUserProfile: builder.query<ApiResponse<any>, void>({
      query: () => profiles.getProfile,
      providesTags: ["Signin"]
    })
  }),
});

export const profileApiHooks = profileApi;