import { MapDataProps, SortValues } from "../components";
const checkArrayIfItemExist=(arr: MapDataProps[], item: MapDataProps)=> arr.map(el=> el._id).includes(item._id);
export const filteredValues = (
  mapData: MapDataProps[],
  sortingValues: SortValues
): MapDataProps[] => {
  return mapData.reduce((acc: MapDataProps[], data: MapDataProps) => {
    const flags = data.flag;
    const direction = data.direction;
    const filteredItems: MapDataProps[] = [];
    flags.forEach((colorFlag) => {
      if (sortingValues.flag.includes(colorFlag) &&
      !checkArrayIfItemExist(filteredItems, data)) {
        filteredItems.push(data);
      }
    });

    if (
      sortingValues.direction.includes(direction) &&
      !checkArrayIfItemExist(filteredItems, data)
    ) {
      filteredItems.push(data);
    }

    return [...acc, ...filteredItems];
  }, []);
};
