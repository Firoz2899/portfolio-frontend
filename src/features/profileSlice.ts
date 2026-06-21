import {
  createSlice,
  type PayloadAction,
  current
} from "@reduxjs/toolkit";

import type { IProfile, ISkill } from "@/types/data.types";
import { profileApi, skillApi } from "@/services";

interface IProfileState {
  isLoading: boolean;
  editProfile: IProfile | null;
  profile: IProfile | null;
  shouldRefreshProfile: boolean;
  hasUpdatedAnyField: boolean;
  skills: ISkill[]
}

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
    builder.addMatcher(
      profileApi.endpoints.getUserProfile.matchFulfilled,
      (state, {payload}) => {
        state.isLoading = false;
        if(payload.IsSuccess){
          state.editProfile = payload.Data;
          state.shouldRefreshProfile = true;
        }
        else {
          state.editProfile = null;
        }
      }
    );
    builder.addMatcher(
      profileApi.endpoints.getUserProfile.matchRejected,
      (state, action) => {
        state.isLoading = false;
        const apiError = action.payload?.data;
        if (apiError) {
            console.log(apiError.Message);
        }
        state.editProfile = null;
      }
    );
    builder.addMatcher(
      skillApi.endpoints.updateTechnology.matchFulfilled,
      (state, {payload}) => {
        if(payload.IsSuccess){
          state.editProfile!.Technologies = payload.Data;
        }
        else {
          state.editProfile!.Technologies = [];
        }
      }
    );
    builder.addMatcher(
      skillApi.endpoints.updateTechnology.matchRejected,
      (state, action) => {
        const apiError = action.payload?.data;
        if (apiError) {
          console.log(apiError.Message);
        }
        state.editProfile!.Technologies = [];
      }
    );
    builder.addMatcher(
      skillApi.endpoints.createSkill.matchFulfilled,
      (state, {payload}) => {
        if(payload.IsSuccess){
          state.editProfile!.Skills = [...(state.editProfile!.Skills || []), payload.Data];
        }
      }
    );
    builder.addMatcher(
      skillApi.endpoints.updateSkill.matchFulfilled,
      (state, {payload}) => {
        if(payload.IsSuccess){
          state.editProfile!.Skills = (state.editProfile!.Skills || []).map(x => {
            if(x.UniqueCode === payload.Data.UniqueCode)
              return payload.Data;
            else
              return x;
          })
        }
      }
    );
    builder.addMatcher(
      skillApi.endpoints.deleteSkill.matchFulfilled,
      (state, {payload}) => {
        if(payload.IsSuccess){
          const finalSkillArray = (state.editProfile!.Skills || []).filter(x => x.UniqueCode != payload.Data.uniqueCode);
          state.editProfile!.Skills = finalSkillArray;
          state.skills = finalSkillArray;
        }
      }
    );
    builder.addMatcher(
      skillApi.endpoints.createSubSkill.matchFulfilled,
      (state, {payload}) => {
        if(payload.IsSuccess){
          const skill = current(state.editProfile?.Skills)?.find(
            x => x.UniqueCode === payload.Data.SkillUniqueCode
          );
          if (skill) {
            const finalSkillArray = (state.editProfile?.Skills || []).map(x => {
              if(x.UniqueCode === payload.Data.SkillUniqueCode){
                x.Skills = [...(x.Skills || []), payload.Data.SubSkill]
              }
              return x;
            });
            state.editProfile!.Skills = finalSkillArray
            state.skills = finalSkillArray
          }
        }
      }
    );
  },
});

export const profileActions = ProfileSlice.actions;

export const profileReducer = ProfileSlice.reducer;