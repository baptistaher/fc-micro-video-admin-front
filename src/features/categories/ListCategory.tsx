import { useEffect, useState } from 'react';

import { Box, Button, Typography } from '@mui/material';
import type { GridFilterModel } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router';

import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from './categorySlice';
import { CategoriesTable } from './components/CategoryTable';

export const CategoryList = () => {
  const [options, setOptions] = useState({
    perPage: 10,
    page: 1,
    search: '',
    rowsPerPage: [10, 25, 50, 100],
  });

  const { data, isFetching, error } = useGetCategoriesQuery(options);
  const [deleteCategory, deleteCategoryState] = useDeleteCategoryMutation();

  const { enqueueSnackbar } = useSnackbar();

  function handleOnPageChange(page: number) {
    console.log('Clicked page', page);
    // setOptions((prev) => ({ ...prev, page: page + 1 }));
    // setOptions({ ...options, page: page + 1 });
  }

  function handleOnPageSizeChange(perPage: number) {
    setOptions({ ...options, perPage });
  }

  function handleFilterChange(filterModel: GridFilterModel) {
    if (!filterModel.quickFilterValues?.length) {
      return setOptions({ ...options, search: '' });
    }
    const search = filterModel.quickFilterValues.join('');

    setOptions({ ...options, search });
  }

  async function handleDeleteCategory(id: string) {
    await deleteCategory({ id });
  }

  useEffect(() => {
    console.log('Current options:', options);
    if (deleteCategoryState.isSuccess) {
      enqueueSnackbar('Category deleted successfully', { variant: 'success' });
    }

    if (deleteCategoryState.isError) {
      enqueueSnackbar('Error deleting category', { variant: 'error' });
    }
  }, [deleteCategoryState, enqueueSnackbar]);

  if (error) {
    return <Typography>Error fetching categories</Typography>;
  }

  return (
    <Box maxWidth="lg">
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/categories/create"
        >
          New Category
        </Button>
      </Box>
      <CategoriesTable
        data={data}
        isFetching={isFetching}
        handleDelete={handleDeleteCategory}
        perPage={options.perPage}
        rowsPerPage={options.rowsPerPage}
        handleOnPageChange={handleOnPageChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleFilterChange={handleFilterChange}
      />
    </Box>
  );
};
