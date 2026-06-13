import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosService";

export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  tagTypes: [
    "Slug",
    "User",
    "Profile",
    "Project",
    "Skill",
    "Service",
    "Experience",
    "Signin"
  ],
  endpoints: () => ({}),
});
