import { Box, Paper, Typography } from '@mui/material';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { createCategory, type Category } from './categorySlice';
import { CategoryForm } from './components/CategorryForm';
import { useAppDispatch } from '../../app/hooks';
import { useSnackbar } from 'notistack';

export const CategoryCreate = () => {
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

  const dispatch = useAppDispatch();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(createCategory(categoryState));

    enqueueSnackbar('Category created successfully', { variant: 'success' });
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCategoryState({ ...categoryState, [name]: value });
  };

  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setCategoryState({ ...categoryState, [name]: checked });
  };

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
