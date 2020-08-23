import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import React, { FunctionComponent, ReactElement, useState } from "react";
import { LatLng, MapDataProps } from "../pointById/PointById";

export const Maps: FunctionComponent<{ locations: MapDataProps[] }> = ({
  locations,
}): ReactElement => {
  const [selected, setSelected] = useState<any>({});
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
          zoom={13}
          mapContainerStyle={mapStyles}
          center={locations[0].cords}
        >
          {locations.map((item: MapDataProps) => {
            return (
              <Marker
                key={item._id}
                position={item.cords}
                onClick={() => setSelected(item)}
              />
            );
          })}
          {selected.location && (
            <InfoWindow
              position={selected.location}
              onCloseClick={() => setSelected({})}
            >
              <>
                <p>Flag: {selected.flag}</p>
                <p>Direction: {selected.direction}</p>
              </>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export const MapsMemorized = React.memo(Maps);
