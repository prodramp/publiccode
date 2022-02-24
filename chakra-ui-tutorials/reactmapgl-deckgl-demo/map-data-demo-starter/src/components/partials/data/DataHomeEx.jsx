import React from 'react';
import {
    Box, VStack, Text,
  } from '@chakra-ui/react';
import { withRouter } from 'react-router';


class DataHomeEx extends React.Component {

    render() {
        return(
            <VStack w="100%">
                <Text>Hello World from Data Home</Text>
            </VStack>
        )
    }
}

export default withRouter(DataHomeEx);
