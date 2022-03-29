import React from 'react';
import MapHomeEx from '../../containers/map/MapHomeEx';
import {
    Box,
  } from '@chakra-ui/react';

  
export default class MapHome extends React.Component {
    state = {

    }
 
    render() {
        return (
            <Box w="100%">
                <MapHomeEx />
            </Box>
        );
    } 
}