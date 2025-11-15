import type { PropsWithChildren } from 'react';
import React from 'react';

import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

import { setupStore, type AppStore, type RootState } from '../app/store';

// As a basic setup, import your same slice reducers

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {},
) {
  const {
    // preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(),
    ...renderOptions
  } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      <BrowserRouter>
        <SnackbarProvider>{children}</SnackbarProvider>
      </BrowserRouter>
    </Provider>
  );

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
