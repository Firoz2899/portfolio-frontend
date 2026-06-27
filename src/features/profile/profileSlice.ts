import {
  createSlice,
  type PayloadAction,
  current
} from "@reduxjs/toolkit";

import type { IProfile, ISkill } from "@/types/data.types";
import { profileApi, skillApi } from "@/services";
import type { IProfileState } from "@/types/state.types";
import { addProfileMatchers, addSkillMatchers, addExperienceMatchers } from ".";

const initialState : IProfileState = {
  isLoading: true,
  editProfile: null,
  profile: null,
  shouldRefreshProfile: false,
  hasUpdatedAnyField: false,
  skills: []
}

export const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<IProfile>) {
      state.profile = action.payload;
    },
    clearProfile(state) {
      state.profile = null;
    },
    setLoading(state, action: PayloadAction<boolean>){
      state.isLoading = action.payload
    },
    setShouldRefreshProfile(state, action: PayloadAction<boolean>){
      state.shouldRefreshProfile = action.payload
    },
    setHasUpdatedAnyField(state, action: PayloadAction<boolean>){
      state.hasUpdatedAnyField = action.payload
    },
    setSkills(state, action: PayloadAction<ISkill[]>){
      state.skills = action.payload
    }
  },
  extraReducers: (builder) => {
    addProfileMatchers(builder);
    addSkillMatchers(builder);
    addExperienceMatchers(builder);
  },
});

export const profileActions = ProfileSlice.actions;

export const profileReducer = ProfileSlice.reducer;