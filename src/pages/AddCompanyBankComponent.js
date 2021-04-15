import React, { Component } from 'react'
import APIHandler from '../utils/APIHandler';
import AuthHandler from '../utils/AuthHandler'

export class AddCompanyBankComponent extends Component {
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
        dataLoaded: false

    }

    componentDidMount() {
        AuthHandler.checkTokenExpiry()
    }

    async formSubmit(event) {
        event.preventDefault();
        this.setState({ btnMessage: 1 })
        var apiHandler = new APIHandler();
        var response = await apiHandler.saveCompanyBankData(event.target.name.value, event.target.license_no.value, event.target.address.value, event.target.contact_no.value, event.target.email.value, event.target.description.value);
        // console.log(response);
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
        this.setState({ dataLoaded: true })
        this.setState({ companyDataList: companydata.data.data })
        // console.log(companydata)
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
                        <h2>Manage Company</h2>
                    </div>
                    <div className="row clearfix">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="card">
                                <div className="header">

                                    <h2>
                                        ADD Bank For Company {this.props.match.params.id}
                                    </h2>

                                </div>
                                <div className="body">
                                    <form onSubmit={this.formSubmit}>
                                        <label htmlFor="bank_account_no">Account No.</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" name="bank_account_no" className="form-control" placeholder="Company Account Number" />
                                            </div>
                                        </div>
                                        <label htmlFor="ifcs_no">IFCS Code</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" name="ifcs_no" className="form-control" placeholder="Enter IFC Number" />
                                            </div>
                                        </div>


                                        <br />
                                        <button disabled={this.state.btnMessage == 0 ? false : true} type="submit" className="btn btn-primary m-t-15 btn-block">{this.state.btnMessage == 0 ? "Add Company Bank" : "Adding Company Bank Please Wait.."}</button>
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
                </div>
            </section>
        )
    }
}

export default AddCompanyBankComponent
