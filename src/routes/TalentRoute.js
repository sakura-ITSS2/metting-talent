import React from 'react';
import { Route } from 'react-router-dom';
import Forbidden from './Forbidden';

const TalentRoute = ({component: Component, ...rest}) => {
    return (
        
        <Route {...rest} component = {props => (
            localStorage.getItem('role')==='Talent'?
            <Component {...props} /> :
            <Forbidden />
        )} />
    );
};

export default TalentRoute;