import { Box, ThemeProvider, Typography } from '@mui/material';
import { Header } from './components/Header';
import Layout from './components/Layout';
import { appTheme } from './config/theme';
import { Route, Routes } from 'react-router';
import { CategoryList } from './features/categories/ListCategory';
import { CategoryCreate } from './features/categories/CreateCategory';
import { CategoryEdit } from './features/categories/EditCategory';
import { SnackbarProvider } from 'notistack';
import { CastMemberList } from './features/castMembers/ListCastmember';
import { CastMemberCreate } from './features/castMembers/CreateCastMember';
import { CastMemberEdit } from './features/castMembers/EditCastMember';
function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <SnackbarProvider
        autoHideDuration={2000}
        maxSnack={3}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box
          component="main"
          className="h-screen"
          sx={{
            backgroundColor: (theme) => theme.palette.grey[900],
          }}
        >
          <Header />
          <Layout>
            <h1>Welcome to React Router!</h1>
            <Routes>
              <Route path="/" element={<CategoryList />} />
              <Route path="/categories" element={<CategoryList />} />
              <Route path="/categories/create" element={<CategoryCreate />} />
              <Route path="/categories/edit/:id" element={<CategoryEdit />} />

              <Route path="/cast-members" element={<CastMemberList />} />
              <Route
                path="/cast-members/create"
                element={<CastMemberCreate />}
              />
              <Route
                path="/cast-members/edit/:id"
                element={<CastMemberEdit />}
              />

              <Route
                path="*"
                element={
                  <Box>
                    <Typography variant="h3" component="h1">
                      Page not found
                    </Typography>
                  </Box>
                }
              />
            </Routes>
          </Layout>
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
