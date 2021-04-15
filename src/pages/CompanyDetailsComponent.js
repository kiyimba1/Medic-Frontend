import React, { Component } from 'react'
import APIHandler from '../utils/APIHandler';
import AuthHandler from '../utils/AuthHandler'

export class CompanyDetailsComponent extends Component {
    constructor(props) {
        super(props)
        this.formSubmit = this.formSubmit.bind(this)
    }

    state = {
        errorRes: false,
        errorMessage: "",
        btnMessage: 0,
        sendData: false,
        companyBank: [],
        name: "",
        license_no: "",
        address: "",
        contact_no: "",
        email: "",
        description: "",
        dataLoaded: false

    }

    componentDidMount() {
        AuthHandler.checkTokenExpiry()
    }

    async formSubmit(event) {
        event.preventDefault();
        this.setState({ btnMessage: 1 })
        var apiHandler = new APIHandler();
        var response = await apiHandler.editCompanyData(event.target.name.value, event.target.license_no.value, event.target.address.value, event.target.contact_no.value, event.target.email.value, event.target.description.value, this.props.match.params.id);
        // console.log(response);
        this.setState({ btnMessage: 0 })
        this.setState({ errorRes: response.data.errorRes })
        this.setState({ errorMessage: response.data.message })
        this.setState({ sendData: true })

    }

    componentDidMount() {
        this.fetchCompanyDetails()
    }

    async fetchCompanyDetails() {

        var apiHandler = new APIHandler();
        var companydetails = await apiHandler.fetchCompanyDetails(this.props.match.params.id)
        this.setState({ companyBank: companydetails.data.data.company_bank })
        this.setState({ name: companydetails.data.data.name, license_no: companydetails.data.data.license_no, address: companydetails.data.data.address, contact_no: companydetails.data.data.contact_no, email: companydetails.data.data.email, description: companydetails.data.data.description })
        this.setState({ dataLoaded: true })

        console.log(companydetails)
    }

    AddCompanyBank = () => {
        this.props.history.push("/addCompanyBank/" + this.props.match.params.id)
    }

    viewCompanyDetails = () => {
        // console.log(id)
        // console.log(this.props)
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
                                {this.state.dataLoaded == false ? (
                                    <div className="text-center">
                                        <div className="preloader pl-size-xl">
                                            <div className="spinner-layer">
                                                <div className="circle-clipper left">
                                                    <div className="circle"></div>
                                                </div>
                                                <div className="circle-clipper right">
                                                    <div className="circle"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : ''}
                                <div className="header">
                                    <h2>
                                        Edit Company
                                    </h2>

                                </div>
                                <div className="body">
                                    <form onSubmit={this.formSubmit}>
                                        <label htmlFor="name">Name</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="name" className="form-control" defaultValue={this.state.name} />
                                            </div>
                                        </div>
                                        <label htmlFor="license_no">License No.</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="license_no" className="form-control" placeholder="Enter License Number" defaultValue={this.state.license_no} />
                                            </div>
                                        </div>
                                        <label htmlFor="address">Address</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="address" className="form-control" placeholder="Enter Address" defaultValue={this.state.address} />
                                            </div>
                                        </div>
                                        <label htmlFor="contact_no">Contact No.</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="contact_no" className="form-control" placeholder="Enter Contact Number" defaultValue={this.state.contact_no} />
                                            </div>
                                        </div>
                                        <label htmlFor="email">Email</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="email" className="form-control" placeholder="Enter Company Email" defaultValue={this.state.email} />
                                            </div>
                                        </div>
                                        <label htmlFor="description">Description</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="description" className="form-control" placeholder="Enter Company Description" defaultValue={this.state.description} />
                                            </div>
                                        </div>

                                        <br />
                                        <button disabled={this.state.btnMessage == 0 ? false : true} type="submit" className="btn btn-primary m-t-15 btn-block">{this.state.btnMessage == 0 ? "Update Company" : "Updating Company Please Wait.."}</button>
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
                                        Account Details
                                    </h2>
                                    <div className="header-dropdown m-r--5">
                                        <button onClick={this.AddCompanyBank} className="btn btn-info">Add Company Account</button>
                                    </div>


                                </div>
                                <div className="body table-responsive">
                                    {this.state.dataLoaded == false ? (
                                        <div className="text-center">
                                            <div className="preloader pl-size-xl">
                                                <div className="spinner-layer">
                                                    <div className="circle-clipper left">
                                                        <div className="circle"></div>
                                                    </div>
                                                    <div className="circle-clipper right">
                                                        <div className="circle"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : ''}
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Account No.</th>
                                                <th>IFC Code</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {this.state.companyBank.map((company) => (
                                                <tr key={company.id}>
                                                    <td>{company.id}</td>
                                                    <td>{company.bank_account_no}</td>
                                                    <td>{company.ifsc_no}</td>

                                                    <td><button type="button" className="btn btn-danger waves-effect">DELETE</button></td>

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

export default CompanyDetailsComponent
