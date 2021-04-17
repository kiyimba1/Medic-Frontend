import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import LogoutComponent from './pages/LogoutComponent'
import { PrivateRouteNew } from './utils/PrivateRouteNew'
import Login from './pages/Login'

import HomeComponent from './pages/HomeComponent'
import CompanyDetailsComponent from './pages/CompanyDetailsComponent'
import AddCompanyBankComponent from './pages/AddCompanyBankComponent'
import ManageMedicineComponent from './pages/ManageMadicineComponent'
import MedicineAddComponent from './pages/MedicineAddComponent'
import { CompanyAccountComponent } from './pages/CompanyAccountComponent'
import CompanyComponent from './pages/CompanyComponent'
import EmployeeComponent from './pages/EmployeeComponent'

ReactDOM.render(
    <Router>
        <Switch>

            <Route exact path="/logout" component={LogoutComponent}></Route>
            <PrivateRouteNew exact path="/home" activepage="0" page={HomeComponent}></PrivateRouteNew>
            <PrivateRouteNew exact path="/company" activepage="1" page={CompanyComponent}></PrivateRouteNew>
            <PrivateRouteNew exact path="/companydetails/:id" activepage="1" page={CompanyDetailsComponent}></PrivateRouteNew>
            <PrivateRouteNew exact path="/addCompanyBank/:id" activepage="1" page={AddCompanyBankComponent}></PrivateRouteNew>
            <PrivateRouteNew exact path="/addMedicine" activepage="2" page={MedicineAddComponent}></PrivateRouteNew>
            <PrivateRouteNew exact path="/manageMedicine" activepage="3" page={ManageMedicineComponent}></PrivateRouteNew>
            
            <PrivateRouteNew exact path="/manageCompanyAccount" activepage="4" page={CompanyAccountComponent}></PrivateRouteNew>
            <PrivateRouteNew exact path="/manageEmployee" activepage="5" page={EmployeeComponent}></PrivateRouteNew>

            <Route exact path="/" component={Login}></Route>
        </Switch>
    </Router>

    , document.getElementById("root"))