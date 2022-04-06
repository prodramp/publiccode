import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import ChakraComp from './ChakraComp';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ChakraComp />
    </ChakraProvider>
  );
}

export default App;
