import { useMemo } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";

import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";

import type {
  RootState,
  AppDispatch,
} from "@/store";


import { 
  appActions, 
  authActions,
  profileActions
} from "@/features";


export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppActions = () => {
  const dispatch = useAppDispatch();

  return useMemo(
    () =>
      bindActionCreators(
        {
          ...appActions,
          ...authActions,
          ...profileActions
        },
        dispatch
      ),
    [dispatch]
  );
};