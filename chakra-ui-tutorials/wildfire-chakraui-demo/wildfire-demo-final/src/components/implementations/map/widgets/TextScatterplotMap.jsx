import React from 'react';
import {render} from 'react-dom';
import {StaticMap} from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import {ScatterplotLayer, TextLayer} from '@deck.gl/layers';

const MALE_COLOR = [2, 2, 255];
const FEMALE_COLOR = [2, 255, 1];
const PLOT_COLOR = [255,1,1];
const DEFAULT_COLOR = [0,0,0];

// Source data CSV
const DATA_URL =
'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/icon/meteorites.json';
//   'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/scatterplot/manhattan.json'; // eslint-disable-line

const INITIAL_VIEW_STATE = {
    longitude: -35,
    latitude: 36.7,
    zoom: 1.8,
    maxZoom: 20,
    pitch: 0,
    bearing: 0
};

export default function TextScatterplotMap({
  data = DATA_URL,
  radius = 10,
  maleColor = MALE_COLOR,
  femaleColor = FEMALE_COLOR,
  fontSize=12,
  mapStyle = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json'
}) {
  const layers = [
    new ScatterplotLayer({
      id: 'scatter-plot',
      data,
      radiusScale: 250,
      radiusMinPixels: 0.25,
      getPosition: d => [d.coordinates[0], d.coordinates[1], 0],
     getFillColor: PLOT_COLOR,
      getRadius:100,
    }),
    new TextLayer({
        id: 'location',
        data,
        characterSet: 'auto',
        getText: d => d.name,
        getPosition: x => x.coordinates,
        getColor: d => DEFAULT_COLOR,
        getSize: d => 20,
        sizeScale: fontSize / 20
      })
  ];

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