import {
  configureStore,
  type ThunkAction,
  type Action,
  combineReducers,
} from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import categoriesReducer, {
  categoriesApiSlice,
} from '../features/categories/categorySlice'; // categoriesApiSlice,
import { apiSlice } from '../features/api/apiSlice';

const rootReducer = combineReducers({
  // counter: counterReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const store = configureStore({
  reducer: {
    ...rootReducer,
    categories: categoriesReducer,
    [categoriesApiSlice.reducerPath]: apiSlice.reducer,
  },

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
