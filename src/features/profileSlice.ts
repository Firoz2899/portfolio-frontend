import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type { IProfile } from "@/types/data.types";
import { profileApi } from "@/services";

interface IProfileState {
  isLoading: boolean;
  editProfile: IProfile | null;
  profile: IProfile | null;
  shouldRefreshProfile: boolean;
}

const initialState : IProfileState = {
  isLoading: true,
  editProfile: null,
  profile: null,
  shouldRefreshProfile: false
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
    )
  },
});

export const profileActions = ProfileSlice.actions;

export const profileReducer = ProfileSlice.reducer;