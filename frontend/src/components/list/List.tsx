import React, { FunctionComponent, ReactElement } from "react";
import { MapDataProps } from "../../components";
import { MdAssistantPhoto } from "react-icons/md";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import "./List.scss";

export const List: FunctionComponent<{ mapData: MapDataProps[] }> = ({
  mapData,
}): ReactElement => (
  <ul className="list">
    {mapData.map((point: MapDataProps) => {
      const { direction, flag, address, id } = point;
      const flagIcons = flag.map((color) => {
        return (
          <IconContext.Provider
            value={{ color, className: "global-class-name", size: "1.5em" }}
          >
            <MdAssistantPhoto />
          </IconContext.Provider>
        );
      });
      return (
        <li className="list--li">
          <p>direction: {direction}</p>
          <p>flag: {flagIcons}</p>
          <p>address: {address}</p>
          <Link to={id} className="list--link">
            see more
          </Link>
        </li>
      );
    })}
  </ul>
);
export const ListMemorized = React.memo(List);
