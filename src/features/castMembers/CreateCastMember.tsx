import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';

import { Box, Paper, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

import type { CastMember } from '../../types/CastMembers';
import { useCreateCastMemberMutation } from './castMembersSlice';
import { CastMemberForm } from './components/CastMemberForm';

export const CastMemberCreate = () => {
  const [createCastMember, status] = useCreateCastMemberMutation();
  // const [isDisabled, setIsDisabled] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const [castMemberState, setCastMemberState] = useState<CastMember>({
    id: '',
    name: '',
    type: 1,
    createdAt: '',
    updatedAt: '',
    deletedAt: null,
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // console.log(castMemberState);

    await createCastMember({
      ...castMemberState,
      createdAt: new Date().toISOString(),
    });
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCastMemberState({
      ...castMemberState,
      [name]: value,
    });
  };

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar('Cast Member created successfully', {
        variant: 'success',
      });
      // setIsDisabled(true);
    }

    if (status.error) {
      enqueueSnackbar('Cast Member creation failed', {
        variant: 'error',
      });
    }
  }, [status.error, status.isSuccess, enqueueSnackbar]);
  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create CastMember</Typography>
          </Box>
          <CastMemberForm
            castMember={castMemberState}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            isDisabled={status.isLoading}
            isLoading={status.isLoading}
            // handleToggle={() => setIsDisabled(!isDisabled)}
          />
        </Box>
      </Paper>
      {/* <h1>CastMemberCreate</h1> */}
    </Box>
  );
};
