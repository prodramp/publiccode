import React from "react";
import { withRouter } from "react-router"
import {Text,  Box, Button, Input,
    VStack, Center,
    HStack,
    Spacer,
    SimpleGrid} from '@chakra-ui/react';
import { AsideSwitcher } from "./AsideSwitcher";
import { ColorModeSwitcher } from "../../../utils/ColorModeSwitcher";

function AppHeader(props) {
    return(
        <React.Fragment>
            <VStack 
                borderBottom={'1px'} borderColor="gray.300"
                w="100%" h="100px" bg="gray.200">
                <HStack w="100%" h="100%" p="1">
                    <Box w="400px" h="100%" bg="pink" rounded="md">
                        <Center h="100%">
                            Logo is here
                        </Center>
                    </Box>
                    <Spacer />
                    <Box w="150px" h="100%" align="end" pr="5">
                        <SimpleGrid columns={2}>
                            <ColorModeSwitcher justifySelf="flex-end"/>
                            <AsideSwitcher  />
                        </SimpleGrid>
                    </Box>
                </HStack>
            </VStack>
        </React.Fragment>
    )

}

export default withRouter(AppHeader);