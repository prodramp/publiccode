import React from 'react';
import {
    Box, VStack, Text, Button, ButtonGroup,
    Link, HStack,
    Code,
    Grid,
  } from '@chakra-ui/react';
import { withRouter } from 'react-router';
import {StaticMap} from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import {ScatterplotLayer} from '@deck.gl/layers';

const INITIAL_VIEW_STATE = {
  longitude: -104,
  latitude: 40.7,
  zoom: 2,
  maxZoom: 16,
  pitch: 50,
  bearing: 0
};

export const colorRange = [
    [1, 152, 189],
    [73, 227, 206],
    [216, 254, 181],
    [210, 200, 200],
    [230, 10, 10],
    [250, 55, 78]
  ];

export default function WildfireScatterMap(props){
  const data = props.wildfireData;
  const radius = 10;
  const mapStyle = props.mapStyle;
  
  const layers = [
    new ScatterplotLayer({
      id: 'scatter-plot',
      data,
      radiusScale: 200,
      radiusMinPixels: 0.25,
      getPosition: d => [d.longitude, d.latitude, 0],
      getFillColor:[255,100,100],
      getRadius:100,
    })
  ]

  return (
    <DeckGL 
        layers={layers} 
        initialViewState={INITIAL_VIEW_STATE} 
        style={{position: 'relative'}}
        controller={true}>
        <StaticMap 
            reuseMaps 
            mapStyle={mapStyle} 
            preventStyleDiffing={true} />
    </DeckGL>
  );
}