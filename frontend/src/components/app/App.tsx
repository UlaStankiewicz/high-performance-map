import React, { FunctionComponent, ReactElement } from "react";
import "./App.scss";
import {
  AddNewPointForm,
  Navigation,
  PointById,
  Home,
} from "../../components/";

import { Route, Switch } from "react-router-dom";

export const App: FunctionComponent = (): ReactElement => {
  return (
    <div className="container">
      <Navigation />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/form" component={AddNewPointForm} />
        <Route path="/:pointId" component={PointById} />
        <Route path="/:pointId" component={PointById} />
      </Switch>
    </div>
  );
};
