import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton, Typography } from '@mui/material';
import {
  DataGrid,
  type GridColDef,
  type GridFilterModel,
  type GridRenderCellParams,
  type GridRowsProp,
} from '@mui/x-data-grid';
import type { GridSlotsComponentsProps } from '@mui/x-data-grid';
import { Link } from 'react-router';

import type { Results } from '../../../types/Category';

type Props = {
  data: Results | undefined;
  perPage: number;
  isFetching: boolean;
  rowsPerPage?: number[];

  handleOnPageChange: (page: number) => void;
  handleFilterChange: (filter: GridFilterModel) => void;
  handleOnPageSizeChange: (pageSize: number) => void;
  handleDelete: (id: string) => void;
};

export const CategoriesTable = ({
  data,
  perPage,
  isFetching,
  rowsPerPage,
  handleOnPageChange,
  handleFilterChange,
  handleOnPageSizeChange,
  handleDelete,
}: Props) => {
  const componentsProps: GridSlotsComponentsProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: { debounceMs: 500 },
    },
    loadingOverlay: {
      variant: 'circular-progress',
      noRowsVariant: 'circular-progress',
    },
  };

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

  function mapDataToGridRows(data: Results) {
    const { data: categories } = data;
    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      description: category.description,
      isActive: category.is_active,
      createdAt: new Date(category.created_at).toLocaleDateString('pt-br'),
    }));
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
        onClick={() => handleDelete(value)}
      >
        <DeleteIcon />
      </IconButton>
    );
  }

  const rows: GridRowsProp = data ? mapDataToGridRows(data) : [];

  const rowCount = data ? data.meta.total : 0;

  console.log('Rows count:', rowCount);
  // console.log("Current Page Size:", model);

  return (
    <Box sx={{ display: 'flex', height: 600 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: perPage,
            },
          },
        }}
        pageSizeOptions={rowsPerPage}
        loading={isFetching}
        rowCount={rowCount}
        paginationMode={'server'}
        filterMode={'server'}
        slotProps={componentsProps}
        disableColumnFilter={true}
        disableColumnSelector={true}
        disableDensitySelector={true}
        disableRowSelectionOnClick={true}
        checkboxSelection={false}
        onPaginationModelChange={(model) => {
          handleOnPageChange(model.page);
          handleOnPageSizeChange(model.pageSize);
        }}
        onFilterModelChange={handleFilterChange}
        showToolbar
      />
    </Box>
  );
};
