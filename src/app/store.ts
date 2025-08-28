import {
  combineReducers,
  configureStore,
  type Action,
  type ThunkAction,
} from '@reduxjs/toolkit';

// import counterReducer from '../features/counter/counterSlice';
import { apiSlice } from '../features/api/apiSlice';
import { castMembersApiSlice } from '../features/castMembers/castMembersSlice';
import { categoriesApiSlice } from '../features/categories/categorySlice'; // categoriesApiSlice,

const rootReducer = combineReducers({
  // counter: counterReducer,
  api: apiSlice.reducer,
  categories: categoriesApiSlice.reducer,
  castMembers: castMembersApiSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  // reducer: {
  //   ...rootReducer,
  //   categories: categoriesReducer,
  //   api: combineReducers({
  //     [apiSlice.reducerPath]: apiSlice.reducer,
  //     [castMembersApiSlice.reducerPath]: castMembersApiSlice.reducer,
  //   }),
  //   [categoriesApiSlice.reducerPath]: categoriesApiSlice.reducer,
  //   [castMembersApiSlice.reducerPath]: castMembersApiSlice.reducer,
  // },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
