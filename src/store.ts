import { configureStore } from "@reduxjs/toolkit";

import { profileApi, slugApi, authApi } from "@/services";
import appReducer from "@/features/appSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    [authApi.reducerPath]: authApi.reducer,
    [slugApi.reducerPath]: slugApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      profileApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;