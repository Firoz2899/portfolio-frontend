import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { IProfile, IProject } from "@/types/data.types";
import type { ApiResponse } from "@/types/common.types";
import {config, apiUrls} from '@/constants'

const {profiles, UniqueCodekeys, projects} = apiUrls

export const profileApi = createApi({
  reducerPath: "profileApi",

  baseQuery: fetchBaseQuery({
    baseUrl: config.apiBaseUrl,
  }),

  tagTypes: [
    "Profile",
    "Skills",
    "Projects",
    "Services",
    "Experience",
  ],

  endpoints: (builder) => ({
    getProfileBySlug: builder.query<
      ApiResponse<IProfile>,
      string
    >({
      query: (slug) =>
        profiles.getProfileBySlug.replace(UniqueCodekeys.profile, slug),
    }),

    getProjects: builder.query<
      ApiResponse<IProject[]>,
      void
    >({
      query: () =>
        projects.profileProjects,
    }),

    getProjectDetails: builder.query<
      ApiResponse<IProject>,
      string
    >({
      query: (slug) =>
        projects.getProjectBySlug.replace(UniqueCodekeys.slug, slug),
    }),
  }),
});

export const {
  useGetProfileBySlugQuery,
  useGetProjectsQuery,
  useGetProjectDetailsQuery,
} = profileApi;