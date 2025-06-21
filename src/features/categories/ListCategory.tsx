import { Box, Button, IconButton, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  deleteCategory,
  selectCategories,
  useGetCategoriesQuery,
} from './categorySlice';
import { Link } from 'react-router';
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
  type GridRowsProp,
} from '@mui/x-data-grid';

import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'notistack';

export const CategoryList = () => {
  const { data, isFetching, error } = useGetCategoriesQuery();

  // console.log(data?.data);

  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const filterGrid = {
    filterModel: {
      items: [],
      quickFilterExcludeHiddenColumns: false,
    },
  };

  const rows: GridRowsProp = categories.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    isActive: category.is_active,
    createdAt: new Date(category.created_at).toLocaleDateString('pt-br'),
  }));

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1, renderCell: renderNameCell },
    {
      field: 'isActive',
      headerName: 'Active',
      flex: 1,
      type: 'boolean',
      renderCell: renderIsActiveCell,
    },
    { field: 'createdAt', headerName: 'Created At', flex: 1 },
    {
      field: 'id',
      headerName: 'Actions',
      flex: 1,
      renderCell: renderActionsCell,
    },
  ];

  function handleDeleteCategory(id: string) {
    dispatch(deleteCategory(id));

    enqueueSnackbar('Category deleted successfully', { variant: 'success' });
  }

  function renderNameCell(rowData: GridRenderCellParams) {
    return (
      <Link
        style={{ textDecoration: 'none' }}
        to={`/categories/edit/${rowData.id}`}
      >
        <Typography color="primary">{rowData.value}</Typography>
      </Link>
    );
  }

  function renderIsActiveCell(rowData: GridRenderCellParams) {
    return (
      <Typography color={rowData.value ? 'primary' : 'secondary'}>
        {rowData.value ? 'Active' : 'Inactive'}
      </Typography>
    );
  }

  function renderActionsCell(rowData: GridRenderCellParams) {
    const { value } = rowData;
    return (
      <IconButton
        color="secondary"
        aria-label="delete"
        onClick={() => handleDeleteCategory(value)}
      >
        <DeleteIcon />
      </IconButton>
    );
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
      <Box sx={{ display: 'flex', height: 600 }}>
        <DataGrid
          pageSizeOptions={[2, 10, 30, 50, 100]}
          rows={rows}
          columns={columns}
          initialState={{
            filter: filterGrid,
          }}
          disableColumnSelector={true}
          disableDensitySelector={true}
          disableColumnFilter={true}
          showToolbar
        />
      </Box>
    </Box>
  );
};
