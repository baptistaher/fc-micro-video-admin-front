import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { apiSlice } from '../api/apiSlice';
import type { Results } from '../../types/Category';

export interface Category {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

const category: Category = {
  id: '4d28f225-42e8-428c-8868-be94476761c7',
  name: 'Olive',
  description: 'Earum quo at dolor tempore nisi.',
  is_active: true,
  deleted_at: null,
  created_at: '2022-10-01T12:00:00.000Z',
  updated_at: '2022-10-01T12:00:00.000Z',
};

const endpointURL = '/categories';

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query }) => ({
    getCategories: query<Results, void>({
      query: () => `${endpointURL}`,
      providesTags: ['Categories'],
    }),
  }),
});

export const InitialState = [
  category,
  {
    ...category,
    id: '4d28f225-42e8-428c-8868-be94476761c8',
    name: 'Peach',
    is_active: false,
  },
  { ...category, id: '4d28f225-42e8-428c-8868-be94476761c9', name: 'Lemon' },
  {
    ...category,
    id: '4d28f225-42e8-428c-8868-be94476761ca',
    name: 'Lime',
    is_active: false,
  },
];

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: InitialState,
  reducers: {
    createCategory(state, action) {
      state.push(action.payload);
    },
    updateCategory(state, action) {
      const index = state.findIndex(
        (category) => category.id === action.payload.id,
      );

      state[index] = action.payload;
    },
    deleteCategory(state, action) {
      const index = state.findIndex(
        (category) => category.id === action.payload.id,
      );

      state.splice(index, 1);
    },
  },
});

// Selectors
export const selectCategories = (state: RootState) => state.categories;
// Select category by id
export const selectCategoryById = (state: RootState, id: string) => {
  const category = state.categories.find((category) => category.id === id);

  return (
    category || {
      id: '',
      name: '',
      description: '',
      is_active: false,
      deleted_at: null,
      created_at: '',
      updated_at: '',
    }
  );
};

export const { createCategory, updateCategory, deleteCategory } =
  categoriesSlice.actions;
export default categoriesSlice.reducer;

export const { useGetCategoriesQuery } = categoriesApiSlice;
