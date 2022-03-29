import React from 'react';
import WildfireMapHomeEx from '../../containers/wildfire/WildfireMapHomeEx';
import {
    Box,
  } from '@chakra-ui/react';

  
export default class WildfireMapHome extends React.Component {
    state = {

    }
 
    render() {
        return (
            <Box w="100%">
                <WildfireMapHomeEx />
            </Box>
        );
    } 
}