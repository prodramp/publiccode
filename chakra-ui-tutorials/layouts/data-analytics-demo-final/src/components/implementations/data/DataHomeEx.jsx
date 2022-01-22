import React from 'react';
import {
    Box, VStack, Text,
    Link,
    Code,
    Grid,
  } from '@chakra-ui/react';
import { withRouter } from 'react-router';

class DataHomeEx extends React.Component {

    render() {
        return(
            <VStack w="100%">
                <Box w="100%" textAlign="center" fontSize="xl">
                    <Text fontSize={'5xl'}>
                        I am from Data Home
                    </Text>
                </Box>
            </VStack>
        )
    }
}

export default withRouter(DataHomeEx);