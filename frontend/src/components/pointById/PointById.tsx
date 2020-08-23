import React, { FunctionComponent, ReactElement, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useHttpClient } from "../../hooks/useHttpClient";
import { Maps, ErrorAlert, LoadingBar } from "../../components/";
import { IconContext } from "react-icons/lib";
import { MdAssistantPhoto } from "react-icons/md";
import { AiOutlineCaretDown, AiOutlineCaretLeft, AiOutlineCaretRight, AiOutlineCaretUp } from "react-icons/ai";

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
        setMapData(responseData.point);
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
        <p>Address: {mapData.address}</p>
        <p>Flag: {mapData.flag.map((color: string, i: number) => {
          return (
            <IconContext.Provider
              value={{ color, className: "global-class-name", size: "1.5em" }} key={i}
            >
              <MdAssistantPhoto />
            </IconContext.Provider>
          )})}</p>
          <p>Direction: {
    
              <IconContext.Provider
                value={{ className: "global-class-name", size: "1.5em" }}
              >
                {mapData.direction === "top" ? <AiOutlineCaretUp /> : mapData.direction === "down" ? <AiOutlineCaretDown/> : mapData.direction === "left"  ? <AiOutlineCaretLeft/> : <AiOutlineCaretRight/> }
              </IconContext.Provider>
          }</p>

        <Maps locations={[mapData]} />
      </div>
    );
  }
  return null
};
