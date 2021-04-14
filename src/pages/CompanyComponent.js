import React, { Component } from 'react'
import AuthHandler from '../utils/AuthHandler'

export class CompanyComponent extends Component {
    componentDidMount() {
        AuthHandler.checkTokenExpiry()
    }

    render() {
        return (
            <section className="content">
                <div className="container-fluid">
                    <div className="block-header">
                        <h2>Manage Company</h2>
                    </div>
                </div>
            </section>
        )
    }
}

export default CompanyComponent
