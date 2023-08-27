import React from 'react'
import {Navigate,Outlet} from 'react-router-dom';

function _Private() {
    const auth = localStorage.getItem('userId');
    return auth?<Outlet/>:<Navigate to="/login"/>
}

export default _Private