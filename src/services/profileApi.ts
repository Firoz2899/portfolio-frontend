import type { IProfile } from "@/types/data.types";
import type { ApiResponse } from "@/types/common.types";
import {apiUrls} from '@/constants'
import { api } from "@/services";
import type { UpdateProfileForm } from "@/types/payload.types";

const {profiles, UniqueCodekeys} = apiUrls

export const profileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfileBySlug: builder.query<ApiResponse<IProfile>, string>({
      query: (slug) =>
        profiles.getProfileBySlug.replace(UniqueCodekeys.profile, slug),
    }),
    getUserProfile: builder.query<ApiResponse<IProfile>, void>({
      query: () => profiles.getProfile,
      providesTags: ["Update-Profile"]
    }),
    updateProfile: builder.mutation<ApiResponse<IProfile>, UpdateProfileForm>({
      query: (data) => ({
        url: profiles.updateProfile,
        method: "PUT",
        data
      }),
      invalidatesTags: ["Update-Profile"]
    })
  }),
});

export const profileApiHooks = profileApi;