import React from 'react';
import PropTypes from 'prop-types';
import {render} from 'react-dom';
import {StaticMap} from 'react-map-gl';
import {AmbientLight, PointLight, LightingEffect} from '@deck.gl/core';
import {HexagonLayer} from '@deck.gl/aggregation-layers';
import DeckGL from '@deck.gl/react';

const INITIAL_VIEW_STATE = {
  longitude: -103.75,
  latitude: 40.73,
  zoom: 3,
  maxZoom: 16,
  pitch: 50,
  bearing: 0
};

export const colorRange = [
  [100, 152, 189],
  [173, 227, 206],
  [216, 254, 181],
  [210, 200, 200],
  [230, 10, 10],
  [250, 55, 78]
];

const material = {
  ambient: .94,
  diffuse: 0.6,
  shininess: 32,
  specularColor: [251, 1, 51]
};

export default function WildfireHexMap(props){
    const data = props.wildfireData;
    const radius = 1000;
    const upperPercentile = 100;
    const intensity = 10;
    const coverage = 1;

      const layers = [
        new HexagonLayer({
          id: 'heatmap',
          colorRange,
          coverage,
          data,
          elevationRange: [0, 3000],
          elevationScale: data && data.length ? 500 : 0,
          extruded: true,
          getPosition: d => [d.longitude, d.latitude],
          pickable: true,
          radius,
          upperPercentile,
          material,
          intensity,
          transitions: {
            elevationScale: 3000
          }
        })
      ];

    return(        
        <DeckGL 
            initialViewState={INITIAL_VIEW_STATE} 
            controller={true}
            style={{position: 'relative'}} 

            layers={layers}>
            <StaticMap 
                reuseMaps 
                mapStyle={props.mapStyle} 
                preventStyleDiffing={true} 
            />
      </DeckGL>
    );
}