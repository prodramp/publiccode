import React from "react";
import { withRouter } from "react-router"
import {Text, VStack} from '@chakra-ui/react';


function AppAside(props) {

    return(
        <React.Fragment>
            <VStack h="100%" w="300px" 
                style={{minWidth:'300px', maxWidth:'300px'}}
                bg="green.100" >
                <Text>Hello from AppAside</Text>
            </VStack>
        </React.Fragment>
    )

}

export default withRouter(AppAside);