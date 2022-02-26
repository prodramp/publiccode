import React from 'react';
import DataHomeEx from '../../containers/data/DataHomeEx';
import {
    Box,
  } from '@chakra-ui/react';

  
export default class DataHome extends React.Component {
    state = {

    }
 
    render() {
        return (
            <Box w="100%">
                <DataHomeEx />
            </Box>
        );
    } 
}