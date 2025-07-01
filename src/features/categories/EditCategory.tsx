import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useParams } from 'react-router';
import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectCategoryById,
  updateCategory,
  type Category,
} from './categorySlice';
import { CategoryForm } from './components/CategoryForm';

export const CategoryEdit = () => {
  const id = useParams().id || '';
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [isDisabled, setIsDisabled] = useState(false);

  const category = useAppSelector((state) => selectCategoryById(state, id));

  const [categoryState, setCategoryState] = useState<Category>(category);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(updateCategory(categoryState));

    enqueueSnackbar('Category updated successfully', { variant: 'success' });
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
            <Typography variant="h4">Edit Category</Typography>
          </Box>
        </Box>
        <CategoryForm
          category={categoryState}
          isDisabled={isDisabled}
          isLoading={false}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  );
};
