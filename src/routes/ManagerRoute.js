import React from 'react';
import { Route } from 'react-router-dom';
import Forbidden from './Forbidden';

const MangerRoute = ({component: Component, ...rest}) => {
    return (
        
        <Route {...rest} component = {props => (
            localStorage.getItem('role')==='Manager'?
            <Component {...props} /> :
            <Forbidden />
        )} />
    );
};

export default MangerRoute;