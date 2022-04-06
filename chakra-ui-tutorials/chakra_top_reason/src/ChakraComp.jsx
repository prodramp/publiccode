import React, {Component} from 'react';
import {Box, 
    VStack,HStack,
    Text, Grid,
    GridItem} from '@chakra-ui/react';

export default class ChakraComp extends React.Component {

    render(){
        return(
            <Grid>
                <GridItem>

                </GridItem>
            </Grid>
            // <VStack h="100vh" w="100vw" border="1" borderColor={'blue.100'} m="5">
            //     <HStack h="60px" w="100%" bg={'red.100'}>

            //     </HStack>
            //     <VStack h='calc(100vh - 60px)' w="100%" bg={'red.200'}>

            //     </VStack>
            //     {/* <Box h="60px" w="100%" bg={'red.100'}>

            //     </Box>
            //     <Box h='calc(100vh - 60px)' w="100%" bg={'yellow.100'}>

            //     </Box> */}
            // </VStack>
        )
    }
}