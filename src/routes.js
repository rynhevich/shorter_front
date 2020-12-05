import React from 'react';
import { Route } from "react-router-dom";
import Regestration from './components/regestration.component.js'
import LogIn from './components/login.component.js'
import Logout from './components/logout.component.js'
import ShowLink from './components/show.component.js'
import Statistics from './components/statistics.component.js'
import NotFound from './components/notfound.component.js'

export default [
    <Route exact path='/' component={LogIn}/>,
    <Route path='/regestration' component={Regestration}/>,
    <Route path='/logout' component={Logout}/>,
    <Route path='/t' component={ShowLink}/>,
    <Route path='/statistics' component={Statistics}/>,
    <Route component={NotFound}/>
];

