import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import CompanyComponent from './pages/CompanyComponent'
import LogoutComponent from './pages/LogoutComponent'
import { PrivateRouteNew } from './utils/PrivateRouteNew'
import Login from './pages/Login'

import HomeComponent from './pages/HomeComponent'
import CompanyDetailsComponent from './pages/CompanyDetailsComponent'
import AddCompanyBankComponent from './pages/AddCompanyBankComponent'
import MedicineAddComponent from './pages/MedicineAddComponent'





ReactDOM.render(
    <Router>
        <Switch>

            <Route exact path="/logout" component={LogoutComponent}></Route>
            <PrivateRouteNew exact path="/home" activepage="0" page={HomeComponent}></PrivateRouteNew>
            <PrivateRouteNew exact path="/company" activepage="1" page={CompanyComponent}></PrivateRouteNew>
            <PrivateRouteNew exact path="/companydetails/:id" activepage="1" page={CompanyDetailsComponent}></PrivateRouteNew>
            <PrivateRouteNew exact path="/addCompanyBank/:id" activepage="1" page={AddCompanyBankComponent}></PrivateRouteNew>
            <PrivateRouteNew exact path="/addMedicine" activepage="2" page={MedicineAddComponent}></PrivateRouteNew>
            <Route exact path="/" component={Login}></Route>
        </Switch>
    </Router>

    , document.getElementById("root"))