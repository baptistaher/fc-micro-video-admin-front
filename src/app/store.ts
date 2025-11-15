import {
  combineReducers,
  configureStore,
  type Action,
  type ThunkAction,
} from '@reduxjs/toolkit';

import { apiSlice } from '../features/api/apiSlice';
import { castMembersApiSlice } from '../features/castMembers/castMembersSlice';
import { categoriesApiSlice } from '../features/categories/categorySlice'; // categoriesApiSlice,

const rootReducer = combineReducers({
  api: apiSlice.reducer,
  categories: categoriesApiSlice.reducer,
  castMembers: castMembersApiSlice.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
