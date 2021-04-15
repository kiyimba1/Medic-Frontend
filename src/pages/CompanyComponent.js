import React, { Component } from 'react'
import APIHandler from '../utils/APIHandler';
import AuthHandler from '../utils/AuthHandler'

export class CompanyComponent extends Component {
    constructor(props) {
        super(props)
        this.formSubmit = this.formSubmit.bind(this)
    }

    state = {
        errorRes: false,
        errorMessage: "",
        btnMessage: 0,
        sendData: false,
        companyDataList: [],

    }

    componentDidMount() {
        AuthHandler.checkTokenExpiry()
    }

    async formSubmit(event) {
        event.preventDefault();
        this.setState({ btnMessage: 1 })
        var apiHandler = new APIHandler();
        var response = await apiHandler.saveCompanyData(event.target.name.value, event.target.license_no.value, event.target.address.value, event.target.contact_no.value, event.target.email.value, event.target.description.value);
        console.log(response);
        this.setState({ btnMessage: 0 })
        this.setState({ errorRes: response.data.errorRes })
        this.setState({ errorMessage: response.data.message })
        this.setState({ sendData: true })

    }

    componentDidMount() {
        this.fetchCompanyData()
    }

    async fetchCompanyData() {
        var apiHandler = new APIHandler();
        var companydata = await apiHandler.fetchAllCompany()
        this.setState({ companyDataList: companydata.data.data })
        console.log(companydata)
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
                                    <form onSubmit={this.formSubmit}>
                                        <label htmlFor="name">Name</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="name" className="form-control" placeholder="Company Name" />
                                            </div>
                                        </div>
                                        <label htmlFor="license_no">License No.</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="license_no" className="form-control" placeholder="Enter License Number" />
                                            </div>
                                        </div>
                                        <label htmlFor="address">Address</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="address" className="form-control" placeholder="Enter Address" />
                                            </div>
                                        </div>
                                        <label htmlFor="contact_no">Contact No.</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="contact_no" className="form-control" placeholder="Enter Contact Number" />
                                            </div>
                                        </div>
                                        <label htmlFor="email">Email</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="email" className="form-control" placeholder="Enter Company Email" />
                                            </div>
                                        </div>
                                        <label htmlFor="description">Description</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="description" className="form-control" placeholder="Enter Company Description" />
                                            </div>
                                        </div>

                                        <br />
                                        <button disabled={this.state.btnMessage == 0 ? false : true} type="submit" className="btn btn-primary m-t-15 btn-block">{this.state.btnMessage == 0 ? "Add Company" : "Adding Company Please Wait.."}</button>
                                        <br />
                                        {this.state.errorRes == false && this.state.sendData == true ? (
                                            <div className="alert alert-success">
                                                {this.state.errorMessage}
                                            </div>
                                        ) : ""}
                                        {this.state.errorRes == true && this.state.sendData == true ? (
                                            <div className="alert alert-danger">
                                                {this.state.errorMessage}
                                            </div>
                                        ) : ""}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row clearfix">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="card">
                                <div className="header">
                                    <h2>
                                        All Companies
                                    </h2>

                                </div>
                                <div className="body table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>NAME</th>
                                                <th>License NO.</th>
                                                <th>Address</th>
                                                <th>Contact</th>
                                                <th>Email</th>
                                                <th>Description</th>
                                                <th>Added On</th>
                                                <th>Action</th>

                                            </tr>
                                        </thead>
                                        <tbody>

                                            {this.state.companyDataList.map((company) => (
                                                <tr key={company.id}>
                                                    <td>{company.id}</td>
                                                    <td>{company.name}</td>
                                                    <td>{company.license_no}</td>
                                                    <td>{company.address}</td>
                                                    <td>{company.contact_no}</td>
                                                    <td>{company.email}</td>
                                                    <td>{company.description}</td>
                                                    <td>{company.added_on}</td>
                                                    <td><button type="button" className="btn btn-warning waves-effect">View</button></td>

                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
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
