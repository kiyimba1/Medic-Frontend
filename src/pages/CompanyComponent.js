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
                    <div className="row clearfix">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="card">
                                <div className="header">
                                    <h2>
                                        ADD Company
                                    </h2>

                                </div>
                                <div className="body">
                                    <form>
                                        <label htmlFor="email_address">Name</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="email_address" className="form-control" placeholder="Company Name" />
                                            </div>
                                        </div>
                                        <label htmlFor="email_address">License No.</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="email_address" className="form-control" placeholder="Enter License Number" />
                                            </div>
                                        </div>
                                        <label htmlFor="email_address">Address</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="email_address" className="form-control" placeholder="Enter Address" />
                                            </div>
                                        </div>
                                        <label htmlFor="email_address">Contact No.</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="email_address" className="form-control" placeholder="Enter Contact Number" />
                                            </div>
                                        </div>
                                        <label htmlFor="email_address">Email</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="email_address" className="form-control" placeholder="Enter Company Email" />
                                            </div>
                                        </div>
                                        <label htmlFor="email_address">Description</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="email_address" className="form-control" placeholder="Enter Company Description" />
                                            </div>
                                        </div>

                                        <br />
                                        <button type="button" className="btn btn-primary m-t-15 btn-block">Add Compant</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default CompanyComponent
