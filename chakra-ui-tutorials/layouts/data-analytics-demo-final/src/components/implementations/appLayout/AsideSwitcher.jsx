import React from "react";
import {Text,  Box, Button, Input,
    Drawer, 
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton, useDisclosure,
    
    VStack,
    HStack,
    Spacer} from '@chakra-ui/react';
import { FaBars } from "react-icons/fa";

export const AsideSwitcher = props => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    return(
        <React.Fragment>
            <Box w="100px" h="100%">
                <Button 
                    leftIcon={<FaBars/>}
                    ref={btnRef} colorScheme='gray' onClick={onOpen}>
                </Button>
                <Drawer
                    isOpen={isOpen}
                    placement='right'
                    onClose={onClose}
                    finalFocusRef={btnRef}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Create your account</DrawerHeader>

                    <DrawerBody>
                        <Input placeholder='Type here...' />
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                        Cancel
                        </Button>
                        <Button colorScheme='blue'>Save</Button>
                    </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </Box>
        </React.Fragment>
    )

}