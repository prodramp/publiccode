import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import AppRouter from './components/routes/index';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
