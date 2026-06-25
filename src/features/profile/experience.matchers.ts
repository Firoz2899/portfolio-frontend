import { type ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { experienceApi, profileApi } from "@/services";
import type { IProfileState } from "@/types/state.types";

export const addProfileMatchers = (
  builder: ActionReducerMapBuilder<IProfileState>
) => {
    builder.addMatcher(
        experienceApi.endpoints.createExperience.matchFulfilled,
        (state, { payload }) => {
            if(payload.IsSuccess){
                state.editProfile!.Experiences = [
                    ...state.editProfile!.Experiences,
                    payload.Data
                ]
            }
        }
    );
    builder.addMatcher(
        experienceApi.endpoints.updateExperience.matchFulfilled,
        (state, { payload }) => {
            if(payload.IsSuccess){
                state.editProfile!.Experiences = (state.editProfile!.Experiences || []).map(x => {
                    if (x.UniqueCode === payload.Data.UniqueCode)
                        return payload.Data;
                    else
                        return x;
                });
            }
        }
    );
    builder.addMatcher(
        experienceApi.endpoints.deleteExperience.matchFulfilled,
        (state, { payload }) => {
            if(payload.IsSuccess){
                state.editProfile!.Experiences = (state.editProfile!.Experiences || []).filter(x => x.UniqueCode !== payload.Data.ExperienceUniqueCode);
            }
        }
    );
}