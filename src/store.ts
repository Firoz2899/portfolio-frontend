import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import * as services from "@/services";
import * as features from "@/features";
// import { getUnwantedStateStrArray } from "./utils/store-helpers";

// const actionsDenylist = getUnwantedStateStrArray("authApi", "profileApi", "slugApi")

export const store = configureStore({
  reducer: {
    // app states
    app: features.appReducer,
    auth: features.authReducer,
    profile: features.profileReducer,

    // rtk query states
    [services.api.reducerPath]: services.api.reducer
  },
  // redux devtool settings
  devTools: {
    // for remove state from redux store completely
    // actionsDenylist: actionsDenylist,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      // attach middleware for related rtk queries execution
      services.api.middleware
    ),
});

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;