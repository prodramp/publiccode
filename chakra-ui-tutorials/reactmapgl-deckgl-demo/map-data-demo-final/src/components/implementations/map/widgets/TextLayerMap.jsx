/* eslint-disable max-len */
import React from 'react';
import {render} from 'react-dom';
import {StaticMap} from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import {TextLayer} from '@deck.gl/layers';

// sample data
const DATA_URL = 'https://rivulet-zhang.github.io/dataRepo/tagmap/hashtags10k.json';

const DEFAULT_COLOR = [200, 200, 1];

const INITIAL_VIEW_STATE = {
  latitude: 39.1,
  longitude: -94.57,
  zoom: 3.8,
  maxZoom: 16,
  pitch: 0,
  bearing: 0
};

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json';

export default function TextLayerMap({
  data = DATA_URL,
  cluster = false,
  fontSize = 2,
  mapStyle = MAP_STYLE,
}) {
      const textLayer = new TextLayer({
          id: 'twitter-topics-raw',
          data,
          characterSet: 'auto',
          getText: d => d.label,
          getPosition: x => x.coordinates,
          getColor: d => DEFAULT_COLOR,
          getSize: d => 20,
          sizeScale: fontSize / 20
        });

  return (
    <DeckGL
      layers={[textLayer]}
      initialViewState={INITIAL_VIEW_STATE}
      controller={{dragRotate: false}}
    >
      <StaticMap reuseMaps mapStyle={mapStyle} preventStyleDiffing={true} />
    </DeckGL>
  );
}
