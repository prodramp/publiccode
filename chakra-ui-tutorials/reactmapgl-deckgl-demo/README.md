

1. Adding package to package.json

```
    "mapbox-gl": "^2.7.0",
    "react-map-gl": "5.1.5",
    "deck.gl": "8.6.9",
    "@deck.gl/react": "^8.6.9",
    "@deck.gl/aggregation-layers": "^8.6.9",
    "@deck.gl/geo-layers": "^8.6.9",
````


2. Add MapBox Token to .env and set as constant variable:

```
[root]/.env
------
REACT_APP_MAP_BOX_TOKEN=pk.eyJ1IjoicHJvZHJhbXAiLCJhIjoiY2t6bmJ5OWxjNW8yZDJ2cGhkYm8ybm9uZSJ9.HcvLq1lJ1wZ9o4KDW8ry0A


[root]/utils/constants.js
-------------
export const MAP_BOX_TOKEN = process.env.REACT_APP_MAP_BOX_TOKEN || ''

```

3. A new component to use ReactMapGL as below:

```
import React, { useState } from "react";
import { CSSReset, ThemeProvider, theme } from "@chakra-ui/react";
import ReactMapGl from "react-map-gl";
import {MAP_BOX_TOKEN} from '../utils/constants';
import { MAPBOX_MAP_STYLES } from '../utils/mapTypes';

const initialViewport = {
  latitude: 38.91,
  longitude: -77.0305,
  zoom: 19
};

const customTheme = {
  ...theme
};

export default function ReactMapGLView() {
  const [viewport, setViewport] = useState(initialViewport);
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
        <ReactMapGl
            mapboxApiAccessToken={MAP_BOX_TOKEN}
            mapStyle={'mapbox://styles/mapbox/streets-v9'} //+ MAPBOX_MAP_STYLES.STREET}
            height="100vh"
            width="100vw"
            {...viewport}
            onViewportChange={newViewport => setViewport(newViewport)}
        />
    </ThemeProvider>
  );
}

```
