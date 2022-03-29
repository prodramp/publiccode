import React from 'react';
import {
    Box, VStack, Text, Button, ButtonGroup,
    Link, HStack,
    Drawer, Stack, Checkbox,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton, SimpleGrid,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
    Code,
    Grid,
  } from '@chakra-ui/react';
import { withRouter } from 'react-router';
import {modisWildfireData} from '../../../data/wildfire/modisWildfireData';
import {viirsWildfireData} from '../../../data/wildfire/viirsWildfireData';

import WildfireScatterMap from './widgets/WildfireScatterMap';
import WildfireHeatMap from './widgets/WildfireHeatMap';
import WildfireHexMap from './widgets/WildfireHexMap';


const mapStyle = {
    'streets': 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
    'dark': 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
    'gray': 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
}


class WildfireMapHomeEx extends React.Component {
    state = {
        mapChoice: 'Heatmap',
        openDrawer:false,
        mapStyle:mapStyle.streets,
        instrumentModis:true,
        instrumentViirs:true,
        wildfireFullData: []
    }

    setupInstrument = () => {
        this.setState({
            wildfireFullData: this.updateWildfireConfidence(0, 100)
        }) 
    }

    updateFullWildfireData = () => {
        var localData = [];
        if (this.state.instrumentModis && this.state.instrumentViirs){
            var tempData = modisWildfireData;
            localData = tempData.concat(viirsWildfireData)
        } else if (this.state.instrumentModis && !this.state.instrumentViirs) {
            localData = modisWildfireData;
        } else if (!this.state.instrumentModis && this.state.instrumentViirs){
            localData = viirsWildfireData;
        }
        return localData;
    }

    updateWildfireConfidence = (minConf, maxConf) => {
        var localData = this.updateFullWildfireData();
        var finalData = [];
        if (localData.length > 0){
            localData.map( (item) => {
                var conf = item.confidence;
                if (typeof conf != 'number'){
                    if (conf === 'nominal'){
                        conf = 50;
                    } else if (conf === 'low') {
                        conf = 1;
                    } else if (conf === 'high') {
                        conf = 100;
                    } else {
                        conf = 50;
                    }
                } 
                if (conf >= minConf && conf <= maxConf){
                    finalData.push(item);
                }
            })
        }
        return finalData;
    }

    updatedDataForSelectedTime = (timeSpan) => {
        let localData = this.updateWildfireConfidence(0,100);
        if (timeSpan < 7){
            var finalData = [];
            localData.map( (item) => {
                var todayDate = new Date();
                if (new Date(item.acq_date) > todayDate.setDate(todayDate.getDate() - timeSpan))
                {
                    finalData.push(item)
                }
            })
            return finalData;
        } else {
            return localData
        }
    }

    updatedData = (timeSpan) => {
        this.setState({
            wildfireFullData: this.updatedDataForSelectedTime(timeSpan)
        })
    }

    componentDidMount = () => {
        this.setState({
            wildfireFullData: this.updateWildfireConfidence(0,100)
        })        
    }

    closeDrawer = () => {
        this.setState({
            openDrawer:false
        })
    }
    updateConfidence = (conf) => {
        this.setState({
            wildfireFullData: this.updateWildfireConfidence(conf[0], conf[1])
        })
    }

    render() {
        return(
            <VStack w="100%">
                <HStack w="100%" style={{minHeight:'60px', maxHeight:'60px'}} bg={'blue.100'}>
                    <Box w="50%" px="2">
                        <Text textStyle={'2xl'}>
                            Wildfire Map Visualization
                            ({this.state.wildfireFullData.length})
                        </Text>
                    </Box>
                    <Box w="50%" align="end">
                        <ButtonGroup padding={'1'} mt="1">
                            <Button onClick={() => this.setState({mapChoice :'Heatmap'})}>
                                HeatMap
                            </Button>
                            <Button onClick={() => this.setState({mapChoice :'Hexmap'})}>
                                HexMap
                            </Button>
                            <Button onClick={() => this.setState({mapChoice :'Scatter'})}>
                                ScatterMap
                            </Button>
                            <Button onClick={() => this.setState({openDrawer: !this.state.openDrawer})}>
                                ...
                            </Button>
                        </ButtonGroup>
                    </Box>
                </HStack>
                <Box w="100vw" h={'calc(100vh - 60px)'} px={5}>
                    {this.state.mapChoice === 'Scatter'
                    ?<WildfireScatterMap 
                    mapStyle={this.state.mapStyle}
                    wildfireData={this.state.wildfireFullData}/>:null}
                    {this.state.mapChoice === 'Heatmap'
                    ?<WildfireHeatMap 
                    mapStyle={this.state.mapStyle}
                    wildfireData={this.state.wildfireFullData}/>:null}
                    {this.state.mapChoice === 'Hexmap'
                    ?<WildfireHexMap 
                        mapStyle={this.state.mapStyle}
                        wildfireData={this.state.wildfireFullData}/>:null}
                </Box>
                <Drawer isOpen={this.state.openDrawer}
                    placement='right'
                    onClose={this.closeDrawer.bind(this)}>
                    <DrawerOverlay />
                    <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Wildfire Data Setup</DrawerHeader>
                    <DrawerBody>
                        <VStack w="100%">
                            <HStack w="100%" rounded="lg" padding={5}
                                border="1px" borderColor={'red.100'}>
                                    <Text>Total Wildfire Datapoints: {this.state.wildfireFullData.length}</Text>
                            </HStack>
                            <HStack w="100%" padding={5} border="1px" alignSelf={'center'} rounded="md" borderColor={'red.100'}>
                                <Button onClick={this.updatedData.bind(this, 1)}
                                    rounded="lg" border="1px" borderColor={'gray.500'}>
                                    24 Hrs
                                </Button>
                                <Button onClick={this.updatedData.bind(this, 3)}
                                    rounded="lg" border="1px" borderColor={'gray.500'}>
                                    3 Days
                                </Button>
                                <Button onClick={this.updatedData.bind(this, 7)}
                                    rounded="lg" border="1px" borderColor={'gray.500'}>
                                    7 Days
                                </Button>
                            </HStack>     
                            <HStack w="100%" padding={5} border="1px" alignSelf={'center'} rounded="md" borderColor={'red.100'}>
                                <Stack spacing={5} direction='row' alignSelf={'center'}>
                                    <Checkbox 
                                        onChange={() => this.setState({instrumentModis: !this.state.instrumentModis})}
                                        defaultChecked={this.state.instrumentModis}>
                                        MODIS
                                    </Checkbox>
                                    <Checkbox 
                                        onChange={() => this.setState({instrumentViirs: !this.state.instrumentViirs})}
                                        defaultChecked={this.state.instrumentViirs}>
                                        VIIRS
                                    </Checkbox>
                                    <Button onClick={this.setupInstrument.bind(this)}>
                                        Ok
                                    </Button>
                                </Stack>
                            </HStack>   
                            <VStack w="100%" padding={5} border="1px" alignSelf={'center'} rounded="md" borderColor={'red.100'}>
                                <Text>Fire Confidence Slider</Text>
                                <RangeSlider
                                    min={1} max={100} step={5}
                                    aria-label={['min', 'max']}
                                    colorScheme='pink'
                                    defaultValue={[1, 100]}
                                    onChangeEnd={(val) => this.updateConfidence(val)}
                                    >
                                    <RangeSliderTrack>
                                        <RangeSliderFilledTrack />
                                    </RangeSliderTrack>
                                    <RangeSliderThumb index={0} />
                                    <RangeSliderThumb index={1} />
                                </RangeSlider>
                            </VStack>
                            <VStack w="100%" border="1px" alignSelf={'center'} rounded="md" borderColor={'red.100'}>
                                <Box w="100%" bg="gray.100"  padding={1} align="center" borderBottom="1px" borderBottomColor="red.100">
                                    <Text>Map Layout Design</Text>
                                </Box>
                                <SimpleGrid w="100%" columns={1} spacing={1}>
                                    <HStack w="100%">
                                        <Box w="100%">

                                        </Box>
                                        <Box w="100px" align="end" >
                                            <Button w="80px" mr="2px" onClick={() => this.setState({mapStyle: mapStyle.dark})}
                                                rounded="lg" border="1px" borderColor={'gray.500'}>
                                                Dark
                                            </Button>
                                        </Box>
                                    </HStack>
                                    <HStack w="100%">
                                        <Box w="100%">

                                        </Box>
                                        <Box w="100px" align="end" >
                                            <Button w="80px" mr="2px" onClick={() => this.setState({mapStyle: mapStyle.gray})}
                                                rounded="lg" border="1px" borderColor={'gray.500'}>
                                                Gray
                                            </Button>
                                        </Box>
                                    </HStack>
                                    <HStack w="100%">
                                        <Box w="100%"></Box>
                                        <Box w="100px" align="end" >
                                            <Button w="80px" mr="2px" onClick={() => this.setState({mapStyle: mapStyle.streets})}
                                                rounded="lg" border="1px" borderColor={'gray.500'}>
                                                Streets
                                            </Button>
                                        </Box>
                                    </HStack> 
                                </SimpleGrid>
                            </VStack>
                        </VStack>
                    </DrawerBody>
                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={this.closeDrawer.bind(this)}>
                        Cancel
                        </Button>
                    </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </VStack>
        )
    }
}

export default withRouter(WildfireMapHomeEx);