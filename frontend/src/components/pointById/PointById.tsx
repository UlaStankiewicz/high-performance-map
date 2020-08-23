import React, { FunctionComponent, ReactElement, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useHttpClient } from "../../hooks/useHttpClient";
import { Maps, ErrorAlert, LoadingBar } from "../../components/";

export interface LatLng {
  lat: number;
  lng: number;
}
export interface MapDataProps {
  address: string;
  cords: LatLng;
  direction: string;
  flag: string[];
  _id: string;
}

export const PointById: FunctionComponent = (): ReactElement | null => {
  const { pointId } = useParams<{ pointId: string }>();
  const { isLoading, error, sendRequest } = useHttpClient();
  const [mapData, setMapData] = useState<MapDataProps | undefined>();

  useEffect((): void => {
    const fetchScores = async (): Promise<void> => {
      try {
        const responseData = await sendRequest(
          `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/${pointId}`
        );
        setMapData(responseData);
      } catch (err) {
        console.warn("cannot find point", err.message);
      }
    };
    fetchScores();
  }, [pointId, sendRequest]);

  if (error) {
    return <ErrorAlert errorMessage={error} fullPage />
  }

  if(isLoading) {
      return <LoadingBar />
  }

  if (mapData) {
    return (
      <div style={{ width: '100%', height: '300px' }}>
        <p>{mapData.address}</p>
        <Maps locations={[mapData]} />
      </div>
    );
  }
  return null
};
