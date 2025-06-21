import type { ReactNode } from 'react';
import { Box, Container } from '@mui/material';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Box>
      <Container maxWidth="lg">{children}</Container>
    </Box>
  );
}
