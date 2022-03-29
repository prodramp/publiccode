import React from 'react';
import {
    Box, VStack, Text,
    Link,
    Code,
    Grid,
  } from '@chakra-ui/react';
import { withRouter } from 'react-router';
import ReactMapGLView from './widgets/ReactMapGL';
import DeckGlMap from './widgets/DeckGlMap';
import ScatterplotMap from './widgets/ScatterplotMap';
import ArcLayerMap from './widgets/ArcLayerMap';
import TextLayerMap from './widgets/TextLayerMap';
import TextScatterplotMap from './widgets/TextScatterplotMap';
import HexMap from './widgets/HexMap';
import TextHexScatterplotMap from './widgets/TextHexScatterplot';

class MapHomeEx extends React.Component {
    state = {
        arcPoints: [],
        hexPoints: []
    }

    componentDidMount = () => {
        fetch('https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/scatterplot/manhattan.json')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    hexPoints: data
                })
        });

        fetch('https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/arc/counties.json')
        .then(response => response.json())
        .then(({features}) => {
            this.setState({
                arcPoints: features
            })
    });

    }

    render() {
        return(
            <VStack w="100%">
                <Box w="100%" textAlign="center" fontSize="xl">
                    <Text fontSize={'5xl'}>
                        I am from Map Home
                    </Text>
                </Box>
                <Box w="100vw" h="100vh">
                    {/* <ReactMapGLView /> */}
                    {/* <DeckGlMap /> */}
                    {/* <ScatterplotMap /> */}
                    {/* <ArcLayerMap data={this.state.arcPoints} /> */}
                    {/* <TextLayerMap /> */}
                    {/* <TextScatterplotMap /> */}
                    {/* <HexMap data={this.state.hexPoints} /> */}
                    <TextHexScatterplotMap />
                </Box>
            </VStack>
        )
    }
}

export default withRouter(MapHomeEx);