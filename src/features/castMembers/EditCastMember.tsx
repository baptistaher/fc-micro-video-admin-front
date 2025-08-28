import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';

import { Box, Paper, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router';

import type { CastMember } from '../../types/CastMembers';
import {
  useGetCastMemberQuery,
  useUpdateCastMemberMutation,
} from './castMembersSlice';
import { CastMemberForm } from './components/CastMemberForm';

export const CastMemberEdit = () => {
  const id = useParams().id || '';

  const { data: castMember } = useGetCastMemberQuery({ id });

  const { enqueueSnackbar } = useSnackbar();

  const [updateCastMember, status] = useUpdateCastMemberMutation();

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

    await updateCastMember(castMemberState);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCastMemberState({ ...castMemberState, [name]: value });
  };

  useEffect(() => {
    if (castMember) {
      setCastMemberState(castMember.data);
    }
  }, [castMember]);

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar('Membro atualizado com sucesso!', {
        variant: 'success',
      });
    }

    if (status.isError) {
      enqueueSnackbar('Ocorreu um erro ao atualizar o membro', {
        variant: 'error',
      });
    }
  }, [status, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h5">Editar membro</Typography>
          </Box>
        </Box>
        <CastMemberForm
          castMember={castMemberState}
          isDisabled={status.isLoading}
          isLoading={status.isLoading}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </Paper>
    </Box>
  );
};
