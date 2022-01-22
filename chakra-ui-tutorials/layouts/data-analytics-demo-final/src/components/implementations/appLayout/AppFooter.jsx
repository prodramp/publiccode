import React from "react";
import { withRouter } from "react-router"
import {Text, VStack} from '@chakra-ui/react';


function AppFooter(props) {

    return(
        <React.Fragment>
            <VStack 
                borderTop="1px" borderColor="gray.400"
                w="100%" h="40px" bg="gray.100">
            <Text>Hello from Footer</Text>
            </VStack>
        </React.Fragment>
    )

}

export default withRouter(AppFooter);