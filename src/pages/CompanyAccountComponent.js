import React, { Component } from 'react'
import APIHandler from '../utils/APIHandler';
import AuthHandler from '../utils/AuthHandler'


export class CompanyAccountComponent extends Component {
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
        dataLoaded: false,
        companyAccountDataList: []

    }

    componentDidMount() {
        AuthHandler.checkTokenExpiry()
    }

    async formSubmit(event) {
        event.preventDefault();
        this.setState({ btnMessage: 1 })
        var apiHandler = new APIHandler();
        var response = await apiHandler.saveCompanyData(event.target.name.value, event.target.license_no.value, event.target.address.value, event.target.contact_no.value, event.target.email.value, event.target.description.value);
        // console.log(response);
        this.setState({ btnMessage: 0 })
        this.setState({ errorRes: response.data.errorRes })
        this.setState({ errorMessage: response.data.message })
        this.setState({ sendData: true })

    }

    componentDidMount() {
        this.fetchCompanyAccountData()
    }



    async fetchCompanyAccountData() {
        var apiHandler = new APIHandler();
        var companyaccountdata = await apiHandler.fetchAllCompanyAccount()
        this.setState({ companyAccountDataList: companyaccountdata.data.data })
        this.setState({ dataLoaded: true })

    }

    viewCompanyDetails = (id) => {
        // console.log(id)
        // console.log(this.props)
        this.props.history.push("/companydetails/" + id)
    }

    render() {
        return (
            <section className="content">
                <div className="container-fluid">
                    <div className="block-header">
                        <h2>Manage Company Account</h2>
                    </div>
                    <div className="row clearfix">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="card">
                                <div className="header">

                                    <h2>
                                        ADD Company Account Bill
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
                                        All Companies Account Transactions
                                    </h2>

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
                                                <th>COMPANY</th>
                                                <th>TRASACTION TYPE</th>
                                                <th>TRANSACTION AMOUNT</th>
                                                <th>TRANSACTION DATE</th>
                                                <th>ADDED ON</th>
                                                <th>PAYMENT METHOD</th>
                                                <th>Added On</th>
                                                <th>Action</th>

                                            </tr>
                                        </thead>
                                        <tbody>



                                            {this.state.companyAccountDataList.map((account) => (
                                                <tr key={account.id}>
                                                    <td>{account.id}</td>
                                                    <td>{account.company_id}</td>
                                                    <td>{account.transaction_type}</td>
                                                    <td>{account.transaction_amount}</td>
                                                    <td>{new Date(account.transaction_date).toLocaleString()}</td>
                                                    <td>{new Date(account.added_on).toLocaleString()}</td>
                                                    <td>{account.payment_method}</td>

                                                    <td><button onClick={() => this.viewCompanyDetails(account.id)} type="button" className="btn btn-warning waves-effect">View</button></td>

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

export default CompanyAccountComponent
