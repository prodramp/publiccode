import React from 'react';
import {
    Box, VStack, Text, Flex,
    Link,
    Code,
    Grid,
  } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../utils/ColorModeSwitcher';
import { Logo } from '../../utils/Logo';
import { withRouter } from 'react-router';
import AppLayout from './appLayout/AppLayout';

class IndexHomeEx extends React.Component {

    render() {
        return(
            <Flex w="100%">
                <AppLayout />
                {/* <Box w="100%" textAlign="center" fontSize="xl">
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
                        Learn Chakra Today
                        </Link>
                    </VStack>
                    </Grid>
                </Box> */}
            </Flex>
        )
    }
 } 

export default withRouter(IndexHomeEx);