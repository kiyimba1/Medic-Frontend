import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import CompanyComponent from './pages/CompanyComponent'
import LogoutComponent from './pages/LogoutComponent'
import { PrivateRouteNew } from './utils/PrivateRouteNew'
import Login from './pages/Login'

import HomeComponent from './pages/HomeComponent'





ReactDOM.render(
    <Router>
        <Switch>

            <Route exact path="/logout" component={LogoutComponent}></Route>
            <PrivateRouteNew exact path="/home" activepage="0" page={<HomeComponent />}></PrivateRouteNew>
            <PrivateRouteNew exact path="/company" activepage="1" page={<CompanyComponent />}></PrivateRouteNew>
            <Route exact path="/" component={Login}></Route>
        </Switch>
    </Router>

    , document.getElementById("root"))