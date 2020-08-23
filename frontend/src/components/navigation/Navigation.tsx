import './Navigation.scss';
import React, { FunctionComponent, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

export const Navigation: FunctionComponent = (): ReactElement => (
    <div className="nav">
        <NavLink to="/" className="nav--link">
            Home
        </NavLink>
        <NavLink to="/form" className="nav--link">
            Add new point
        </NavLink>
    </div>
);

