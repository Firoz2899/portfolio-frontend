import { type ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { profileApi } from "@/services";
import type { IProfileState } from "@/types/state.types";

export const addProfileMatchers = (
  builder: ActionReducerMapBuilder<IProfileState>
) => {
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
};