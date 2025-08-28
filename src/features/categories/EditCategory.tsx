import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';

import { Box, Paper, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router';

import {
  useGetCategoryQuery,
  useUpdateCategoryMutation,
  type Category,
} from './categorySlice';
import { CategoryForm } from './components/CategoryForm';

export const CategoryEdit = () => {
  const id = useParams().id || '';
  const { data: category, isFetching } = useGetCategoryQuery({ id });

  const { enqueueSnackbar } = useSnackbar();

  const [updateCategory, status] = useUpdateCategoryMutation();

  const [categoryState, setCategoryState] = useState<Category>({
    id: '',
    name: '',
    description: '',
    is_active: false,
    created_at: '',
    updated_at: '',
    deleted_at: '',
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await updateCategory(categoryState);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCategoryState({ ...categoryState, [name]: value });
  };

  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setCategoryState({ ...categoryState, [name]: checked });
  };

  useEffect(() => {
    if (category) {
      setCategoryState(category.data);
    }
  }, [category]);

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar('Category updated successfully', { variant: 'success' });
    }

    if (status.error) {
      enqueueSnackbar('Failed to update category', { variant: 'error' });
    }
  }, [enqueueSnackbar, status.error, status.isSuccess]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Category</Typography>
          </Box>
        </Box>
        <CategoryForm
          category={categoryState}
          isDisabled={status.isLoading}
          isLoading={false}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  );
};
