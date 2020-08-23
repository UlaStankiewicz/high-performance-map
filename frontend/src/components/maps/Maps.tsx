import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import React, { FunctionComponent, ReactElement, useState } from "react";
import { MapDataProps } from "../pointById/PointById";

export const Maps: FunctionComponent<{ locations: MapDataProps[] }> = ({
  locations,
}): ReactElement => {
  const [selected, setSelected] = useState<MapDataProps | undefined>();
  const mapStyles = {
    height: "500px",
    width: "80%",
  };

  return (
    <>
      <LoadScript
        id="script-loader"
        googleMapsApiKey={process.env.REACT_APP_API_KEY}
      >
        <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={locations[0].cords}>
        
      {
        locations.map(item => {
            return (
            <Marker
              key={item._id}
              position={item.cords}
              onClick={() => setSelected(item)}
            />
            )
          })
      },
      {
        selected && 
        (
          <InfoWindow
            position={selected.cords}
            onCloseClick={() => setSelected(undefined)}
        >
          <p>{selected.address}</p>
        </InfoWindow>
        )
     }
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export const MapsMemorized = React.memo(Maps);