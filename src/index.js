import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import MainComponent from './components/MainComponent'

import Login from './pages/Login'
import { PrivateRoute } from './utils/PrivateRoute'

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" component={Login}></Route>
            <PrivateRoute exact path="/home" component={MainComponent}></PrivateRoute>
        </Switch>
    </Router>

    , document.getElementById("root"))