import React, { Component } from 'react'
import { Redirect } from 'react-router'
import AuthHandler from '../utils/AuthHandler'

export class LogoutComponent extends Component {
    render() {
        AuthHandler.logOutUser();
        return (
            <Redirect to="/" />
        )
    }
}

export default LogoutComponent
