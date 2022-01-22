import React from "react";
import { withRouter } from "react-router"
import {Text, VStack, Box, Button} from '@chakra-ui/react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


function AppSidebar(props) {
    const [size, setSize] = React.useState(250)
    const [iconName, setIconName] = React.useState(FaArrowLeft)

    const togglePanel = () => {
        setSize(size == 50 ? 250: 50)
        setIconName(size == 50 ? FaArrowLeft : FaArrowRight)
    }

    return(
        <React.Fragment>
            <VStack h="100%" w={size + "px"} bg="red.200" 
                style={{minWidth:size + 'px', maxWidth:size + 'px'}} >
                    <Box w="100%" h="40px" align={'end'} p="1">
                        <Button 
                            onClick={togglePanel}
                            size="sm" leftIcon={iconName}/> 
                    </Box>
                    <Text>Hello from AppSidebar</Text>
            </VStack>
        </React.Fragment>
    )

}

export default withRouter(AppSidebar);