import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import AppRouter from './components/routes/index';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './store';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
