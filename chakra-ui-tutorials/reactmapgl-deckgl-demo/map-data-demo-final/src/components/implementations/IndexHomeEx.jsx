import React from 'react';
import {
    Box, VStack, Text,
    Link,
    Code,
    Grid,
  } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../utils/ColorModeSwitcher';
import { Logo } from '../../utils/Logo';
import { withRouter } from 'react-router';

class IndexHomeEx extends React.Component {

    render() {
        return(
            <VStack w="100%">
                <Box w="100%" textAlign="center" fontSize="xl">
                    <Grid minH="100vh" p={3}>
                    <ColorModeSwitcher justifySelf="flex-end" />
                    <VStack spacing={8} border="1px" borderColor={"gray"} rounded="md" bg="gray.100">
                        <Text color={"gray.500"} fontSize={"5xl"}>Hi, I am here</Text>
                        <Logo h="40vmin" pointerEvents="none" />
                        <Text>
                        Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
                        </Text>
                        <Link
                        color="teal.500"
                        href="https://chakra-ui.com"
                        fontSize="2xl"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        Learn Chakra
                        </Link>
                    </VStack>
                    </Grid>
                </Box>
            </VStack>
        )
    }
 } 

export default withRouter(IndexHomeEx);