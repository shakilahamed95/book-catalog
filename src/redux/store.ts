import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./features/user/userSlice";
import { api } from "./api/apiSlice";
export const store = configureStore({
  reducer: {
    user: UserReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
