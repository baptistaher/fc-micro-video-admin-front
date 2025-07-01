import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router';
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from './categorySlice';

import type { GridFilterModel } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { CategoriesTable } from './components/CategoryTable';

export const CategoryList = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [rowsPerPage] = useState([10, 25, 50, 100]);

  const options = { perPage, page, search };

  const { data, isFetching, error } = useGetCategoriesQuery(options);
  const [deleteCategory, deleteCategoryState] = useDeleteCategoryMutation();

  const { enqueueSnackbar } = useSnackbar();

  function handleOnPageChange(page: number) {
    setPage(page + 1);
  }

  function handleOnPageSizeChange(perPage: number) {
    setPerPage(perPage);
  }

  function handleFilterChange(filterModel: GridFilterModel) {
    console.log(filterModel);

    if (filterModel.quickFilterValues?.length) {
      const search = filterModel.quickFilterValues.join('');

      setSearch(search);
    } else {
      setSearch('');
    }
  }

  async function handleDeleteCategory(id: string) {
    await deleteCategory({ id });
    // dispatch(deleteCategory(id));
    // enqueueSnackbar('Category deleted successfully', { variant: 'success' });
  }

  useEffect(() => {
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
        perPage={perPage}
        rowsPerPage={rowsPerPage}
        handleOnPageChange={handleOnPageChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleFilterChange={handleFilterChange}
      />
    </Box>
  );
};
