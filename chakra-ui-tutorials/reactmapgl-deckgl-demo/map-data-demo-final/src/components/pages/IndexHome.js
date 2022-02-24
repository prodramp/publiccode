import React from 'react';
import IndexHomeEx from '../partials/IndexHomeEx';
import {
    Box,
  } from '@chakra-ui/react';

  
export default class IndexHome extends React.Component {
    state = {

    }
 
    render() {
        return (
            <Box w="100%">
                <IndexHomeEx />
            </Box>
        );
    } 
}