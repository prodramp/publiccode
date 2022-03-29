import React from 'react';
import {
    Box, VStack, Text, Button, ButtonGroup,
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
        hexPoints: [],
        mapChoice: 'Scatterplot'
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
                <Box w="100%" style={{minHeight:'60px', maxHeight:'60px'}} bg={'blue.100'}>
                    <ButtonGroup padding={'1'}>
                        <Button onClick={() => this.setState({mapChoice :'ReactMapGLView'})}>
                            ReactMapGLView
                        </Button>
                        <Button onClick={() => this.setState({mapChoice :'DeckGlMap'})}>
                            DeckGlMap
                        </Button>
                        <Button onClick={() => this.setState({mapChoice :'Scatterplot'})}>
                            Scatterplot
                        </Button>
                        <Button onClick={() => this.setState({mapChoice :'ArchLayer'})}>
                            ArchLayer Map
                        </Button>
                        <Button onClick={() => this.setState({mapChoice :'TextScatterPlot'})}>
                            TextScatterPlot 
                        </Button>
                        <Button onClick={() => this.setState({mapChoice :'TextLayer'})}>
                            TextLayer 
                        </Button>
                        <Button onClick={() => this.setState({mapChoice :'Hexmap'})}>
                            Hexmap 
                        </Button>
                        <Button onClick={() => this.setState({mapChoice :'TextHexmap'})}>
                            TextHexmap 
                        </Button>
                    </ButtonGroup>
                </Box>
                <Box w="100vw" h={'calc(100vh - 60px)'}>
                    {this.state.mapChoice === 'ReactMapGLView'
                    ?<ReactMapGLView />:null}
                    {this.state.mapChoice === 'DeckGlMap'
                    ?<DeckGlMap />:null}
                    {this.state.mapChoice === 'Scatterplot'
                    ?<ScatterplotMap />:null}
                    {this.state.mapChoice === 'TextLayer'
                    ?<TextLayerMap />:null}
                    {this.state.mapChoice === 'TextScatterPlot'
                    ?<TextScatterplotMap />:null}
                    {this.state.mapChoice === 'ArchLayer'
                    ?<ArcLayerMap data={this.state.arcPoints} /> :null}
                    {this.state.mapChoice === 'Hexmap'
                    ?<HexMap data={this.state.hexPoints} /> :null}
                    {this.state.mapChoice === 'TextHexmap'
                    ?<TextHexScatterplotMap /> :null}
                </Box>
            </VStack>
        )
    }
}

export default withRouter(MapHomeEx);