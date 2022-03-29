import React, { useState } from "react";
import { CSSReset, ThemeProvider, theme } from "@chakra-ui/react";
import ReactMapGl from "react-map-gl";


import {MAP_BOX_TOKEN} from '../../../../utils/constants';
const initialViewport = {
  latitude: 38.91,
  longitude: -77.0305,
  zoom: 20
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
            style={{position: 'relative'}}
            mapStyle={'mapbox://styles/mapbox/streets-v9'} //+ MAPBOX_MAP_STYLES.STREET}
            height="100vh"
            width="100vw"
            {...viewport}
            onViewportChange={newViewport => setViewport(newViewport)}
        />
    </ThemeProvider>
  );
}