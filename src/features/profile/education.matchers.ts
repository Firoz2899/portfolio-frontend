import { type ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { educationApi } from "@/services";
import type { IProfileState } from "@/types/state.types";

export const addEducationMatchers = (
  builder: ActionReducerMapBuilder<IProfileState>
) => {
    builder.addMatcher(
        educationApi.endpoints.createEducation.matchFulfilled,
        (state, { payload }) => {
            if(payload.IsSuccess){
                state.editProfile!.Educations = [
                    ...state.editProfile!.Educations,
                    payload.Data
                ]
            }
        }
    );
    builder.addMatcher(
        educationApi.endpoints.updateEducation.matchFulfilled,
        (state, { payload }) => {
            if(payload.IsSuccess){
                state.editProfile!.Educations = (state.editProfile!.Educations || []).map(x => {
                    if (x.UniqueCode === payload.Data.UniqueCode)
                        return payload.Data;
                    else
                        return x;
                });
            }
        }
    );
    builder.addMatcher(
        educationApi.endpoints.deleteEducation.matchFulfilled,
        (state, { payload }) => {
            if(payload.IsSuccess){
                state.editProfile!.Educations = (state.editProfile!.Educations || []).filter(x => x.UniqueCode !== payload.Data.EducationUniqueCode);
            }
        }
    );
}