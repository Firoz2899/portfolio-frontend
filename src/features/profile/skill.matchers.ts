import { current, type ActionReducerMapBuilder } from "@reduxjs/toolkit";
import type { IProfileState } from "@/types/state.types";
import { skillApi } from "@/services";

export const addSkillMatchers = (
    builder: ActionReducerMapBuilder<IProfileState>
) => {
    builder.addMatcher(
        skillApi.endpoints.updateTechnology.matchFulfilled,
        (state, { payload }) => {
            if (payload.IsSuccess) {
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
        (state, { payload }) => {
            if (payload.IsSuccess) {
                state.editProfile!.Skills = [...(state.editProfile!.Skills || []), payload.Data];
            }
        }
    );
    builder.addMatcher(
        skillApi.endpoints.updateSkill.matchFulfilled,
        (state, { payload }) => {
            if (payload.IsSuccess) {
                state.editProfile!.Skills = (state.editProfile!.Skills || []).map(x => {
                    if (x.UniqueCode === payload.Data.UniqueCode)
                        return payload.Data;
                    else
                        return x;
                })
            }
        }
    );
    builder.addMatcher(
        skillApi.endpoints.deleteSkill.matchFulfilled,
        (state, { payload }) => {
            if (payload.IsSuccess) {
                const finalSkillArray = (state.editProfile!.Skills || []).filter(x => x.UniqueCode != payload.Data.uniqueCode);
                state.editProfile!.Skills = finalSkillArray;
                state.skills = finalSkillArray;
            }
        }
    );
    builder.addMatcher(
        skillApi.endpoints.createSubSkill.matchFulfilled,
        (state, { payload }) => {
            if (payload.IsSuccess) {
                const skill = current(state.editProfile?.Skills)?.find(
                    x => x.UniqueCode === payload.Data.SkillUniqueCode
                );
                if (skill) {
                    const finalSkillArray = (state.editProfile?.Skills || []).map(x => {
                        if (x.UniqueCode === payload.Data.SkillUniqueCode) {
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
};