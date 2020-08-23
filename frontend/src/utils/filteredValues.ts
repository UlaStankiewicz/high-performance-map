import { MapDataProps, SortValues } from "../components";

export const filteredValues = (
  mapData: MapDataProps[],
  sortingValues: SortValues
): MapDataProps[] => {
  return mapData.reduce((acc: MapDataProps[], data: MapDataProps) => {
    const flags = data.flag;
    const direction = data.direction;
    const filteredItems: MapDataProps[] = [];
    flags.forEach((colorFlag) => {
      if (sortingValues.flag.includes(colorFlag)) {
        filteredItems.push(data);
      }
    });
    if (
      sortingValues.direction.includes(direction) &&
      !filteredItems.includes(data)
    ) {
      filteredItems.push(data);
    }

    return [...acc, ...filteredItems];
  }, []);
};
