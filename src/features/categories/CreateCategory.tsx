import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';

import { Box, Paper, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

import { useCreateCategoryMutation, type Category } from './categorySlice';
import { CategoryForm } from './components/CategoryForm';

export const CategoryCreate = () => {
  const [createCategory, status] = useCreateCategoryMutation();
  const [isDisabled, setIsDisabled] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const [categoryState, setCategoryState] = useState<Category>({
    id: '',
    name: '',
    description: '',
    is_active: false,
    deleted_at: null,
    created_at: '',
    updated_at: '',
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await createCategory({
      ...categoryState,
      created_at: new Date().toISOString(),
    });
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
    if (status.isSuccess) {
      enqueueSnackbar('Category created successfully', { variant: 'success' });
      setIsDisabled(true);
    }

    if (status.error) {
      enqueueSnackbar('Category creation failed', { variant: 'error' });
    }
  }, [status.error, status.isSuccess, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Category</Typography>
          </Box>
          <CategoryForm
            category={categoryState}
            isDisabled={isDisabled}
            isLoading={false}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleToggle={handleToggle}
          />
        </Box>
      </Paper>
    </Box>
  );
};
