import {
  DataGrid,
  type GridColDef,
  type GridFilterModel,
  type GridRenderCellParams,
  type GridRowsProp,
} from '@mui/x-data-grid';
import type { Results } from '../../../types/CastMembers';
import { Box, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router';
import DeleteIcon from '@mui/icons-material/Delete';

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

export const CastMembersTable = ({
  data,
  perPage,
  isFetching,
  rowsPerPage,
  handleOnPageChange,
  handleFilterChange,
  handleOnPageSizeChange,
  handleDelete,
}: Props) => {
  const componentsProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: { debounceMs: 500 },
    },
  };

  const columns: GridColDef[] = [
    { flex: 1, field: 'name', headerName: 'Name', renderCell: renderNameCell },
    { flex: 1, field: 'type', headerName: 'Type', renderCell: renderTypeCell },
    {
      field: 'id',
      headerName: 'Actions',
      flex: 1,
      renderCell: renderActionsCell,
    },
  ];

  function renderTypeCell(rowData: GridRenderCellParams) {
    return (
      <Typography color="primary">
        {rowData.value === 1 ? 'Director' : 'Actor'}
      </Typography>
    );
  }

  function renderNameCell(rowData: GridRenderCellParams) {
    return (
      <Link
        style={{ textDecoration: 'none' }}
        to={`/cast-members/edit/${rowData.id}`}
      >
        <Typography color="primary">{rowData.value}</Typography>
      </Link>
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

  function mapDataToGridRows(data: Results) {
    const { data: castMembers } = data;
    return castMembers.map((castMember) => ({
      id: castMember.id,
      name: castMember.name,
      type: castMember.type,
      // createdAt: new Date(castMember.createdAt).toLocaleDateString('pt-br'),
    }));
  }

  const rows: GridRowsProp = data ? mapDataToGridRows(data) : [];

  const rowCount = data ? data.meta.total : 0;

  return (
    <Box sx={{ display: 'flex', height: 600 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: perPage } },
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
