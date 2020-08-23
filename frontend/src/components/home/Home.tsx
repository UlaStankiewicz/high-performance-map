import React, {
  FunctionComponent,
  ReactElement,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useHttpClient } from "../../hooks/useHttpClient";
import {
  MapDataProps,
  ErrorAlert,
  LoadingBar,
  MapsMemorized,
  ListMemorized,
  FilterInputs,
  SortValues,
} from "../../components/";
import "./Home.scss";
import { filteredValues } from "../../utils/filteredValues";
export const Home: FunctionComponent = (): ReactElement => {
  const [mapVisible, setMapVisible] = useState<boolean>(false);
  const { isLoading, error, sendRequest } = useHttpClient();
  const [mapData, setMapData] = useState<MapDataProps[] | undefined>();
  const [sortValues, setSortValues] = useState<SortValues | undefined>();

  useEffect((): void => {
    const fetchScores = async (): Promise<void> => {
      try {
        const responseData = await sendRequest(
          `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/getAllPoints`
        );
        setMapData(responseData.points);
      } catch (err) {
        console.warn("cannot fetch points", err.message);
      }
    };
    fetchScores();
  }, [sendRequest]);

  const handleSortValues = useCallback((value) => {
    setSortValues(value);
  }, []);

  const sortedMapData = useMemo((): MapDataProps[] | [] => {
    return mapData && sortValues ? filteredValues(mapData, sortValues) : [];
  }, [mapData, sortValues, filteredValues]);

  if (error) {
    return <ErrorAlert errorMessage={error} fullPage />;
  }

  if (isLoading) {
    return <LoadingBar />;
  }

  const map =
    sortedMapData.length > 0 ? (
      <MapsMemorized locations={sortedMapData} />
    ) : (
      <ErrorAlert errorMessage="No data to display" fullPage />
    );

  const list =
    sortedMapData.length > 0 ? (
      <ListMemorized mapData={sortedMapData} />
    ) : (
      <ErrorAlert errorMessage="No data to display" fullPage />
    );
  console.log(sortedMapData, mapData);
  return (
    <>
      <button className="btn" onClick={(): void => setMapVisible(!mapVisible)}>
        {mapVisible ? "Hide Map" : "Show map"}
      </button>
      <div className="home">
        <FilterInputs setSortValues={handleSortValues} />
        {mapVisible ? map : list}
      </div>
    </>
  );
};
