import { useEffect, useState } from 'react';
import {
  useDeleteCastMemberMutation,
  useGetCastMembersQuery,
} from './castMembersSlice';
import type { GridFilterModel } from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router';
import { CastMembersTable } from './components/CastMemberTable';
import { useSnackbar } from 'notistack';
export const CastMemberList = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [options, setOptions] = useState({
    perPage: 10,
    page: 1,
    search: '',
    rowsPerPage: [10, 25, 50, 100],
  });

  const { data, isFetching, error } = useGetCastMembersQuery(options);
  const [deleteCastMember, deleteCastMemberState] =
    useDeleteCastMemberMutation();

  function handleOnPageChange(page: number) {
    setOptions({ ...options, page: page + 1 });
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

  async function handleDeleteCastMember(id: string) {
    await deleteCastMember({ id });
  }

  useEffect(() => {
    if (deleteCastMemberState.isSuccess) {
      enqueueSnackbar('Cast Member deleted successfully', {
        variant: 'success',
      });
    }

    if (deleteCastMemberState.isError) {
      enqueueSnackbar('Error deleting Cast Member', { variant: 'error' });
    }
  }, [deleteCastMemberState, enqueueSnackbar]);

  if (error) {
    return <Typography variant="h2">Error!</Typography>;
  }

  return (
    <Box maxWidth="lg">
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/cast-members/create"
        >
          New Cast Member
        </Button>
      </Box>
      <CastMembersTable
        data={data}
        perPage={options.perPage}
        isFetching={isFetching}
        rowsPerPage={options.rowsPerPage}
        handleOnPageChange={handleOnPageChange}
        handleFilterChange={handleFilterChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleDelete={handleDeleteCastMember}
      />
    </Box>
  );
};
