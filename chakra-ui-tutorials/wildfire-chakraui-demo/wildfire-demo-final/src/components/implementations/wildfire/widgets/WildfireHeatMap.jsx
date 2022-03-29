import React from 'react';
import {render} from 'react-dom';
import {StaticMap} from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import {HeatmapLayer} from '@deck.gl/aggregation-layers';

const INITIAL_VIEW_STATE = {
  longitude: -103.75,
  latitude: 40.73,
  zoom: 2,
  maxZoom: 16,
  pitch: 50,
  bearing: 0
};

export const colorRange = [
    [200, 50, 50],
    [73, 227, 206],
    [216, 254, 181],
    [210, 200, 200],
    [230, 110, 10],
    [250, 255, 78]
  ];


export default function WildfireHeatMap(props) {
    const data = props.wildfireData;
    const intensity = 1;
    const threshold = 0.03;
    const radiusPixels = 3;
    const mapStyle = props.mapStyle;
    const layers = [
        new HeatmapLayer({
          data,
          id: 'heatmp-layer-custom',
          pickable: false,
          getPosition: d => [d.longitude, d.latitude],
          getWeight: d => d.confidence,
          radiusPixels,
          intensity,
          colorRange,
          threshold
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
                mapStyle={mapStyle} 
                preventStyleDiffing={true} 
            />
      </DeckGL>
    );
}