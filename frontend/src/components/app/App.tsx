import React, { FunctionComponent, ReactElement } from "react";
import "./App.scss";
import {
  AddNewPointForm,
} from "../../components/";

import { Route, Switch } from "react-router-dom";

export const App: FunctionComponent = (): ReactElement => {
  return (
    <div className="container">
      <Switch>
        <Route path="/form" component={AddNewPointForm} />
      </Switch>
    </div>
  );
};
