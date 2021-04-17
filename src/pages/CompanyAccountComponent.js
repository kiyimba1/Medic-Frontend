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
        companylist: [],
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
        var response = await apiHandler.addBillAccount(event.target.company_id.value, event.target.transaction_type.value, event.target.transaction_amount.value, event.target.transaction_date.value, event.target.payment_method.value);
        // console.log(response);
        this.setState({ btnMessage: 0 })
        this.setState({ errorRes: response.data.errorRes })
        this.setState({ errorMessage: response.data.message })
        this.setState({ sendData: true })
        this.updateData()

    }

    componentDidMount() {
        this.fetchCompanyAccountData()
    }



    async fetchCompanyAccountData() {
        var apiHandler = new APIHandler();
        var companydata = await apiHandler.fetchCompanyOnly()
        var companyaccountdata = await apiHandler.fetchAllCompanyAccount()
        this.setState({ companyAccountDataList: companyaccountdata.data.data, companylist: companydata.data })
        this.setState({ dataLoaded: true })
        // console.log(companydata)

    }

    viewCompanyDetails = (id) => {
        // console.log(id)
        // console.log(this.props)
        this.props.history.push("/companydetails/" + id)
    }

    async updateData() {
        var apiHandler = new APIHandler();
        var companyaccountdata = await apiHandler.fetchAllCompanyAccount()
        this.setState({ companyAccountDataList: companyaccountdata.data.data })
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
                                        <label htmlFor="company_id">Company</label>
                                        <div className="form-inline">
                                            <select className="form-control" name="company_id">
                                                {this.state.companylist.map((item) => (
                                                    <option value={item.id} key={item.id}>{item.name}</option>
                                                ))}
                                            </select>

                                        </div>
                                        <label htmlFor="transaction_type">Transaction type</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <select id="transaction_type" name="transaction_type" className="form-control" >
                                                    <option value="D">Debit</option>
                                                    <option value="C">Credit</option>
                                                </select>
                                            </div>
                                        </div>
                                        <label htmlFor="transaction_amount">Transaction Ammount</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="transaction_amount" name="transaction_amount" className="form-control" placeholder="Enter Transaction Ammount" />
                                            </div>
                                        </div>
                                        <label htmlFor="transaction_date">Transaction Date</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="transaction_date" name="transaction_date" className="form-control" placeholder="Enter Transaction Date" />
                                            </div>
                                        </div>
                                        <label htmlFor="payment_method">Payment Method</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="payment_method" name="payment_method" className="form-control" placeholder="Enter Payment Method" />
                                            </div>
                                        </div>


                                        <br />
                                        <button disabled={this.state.btnMessage == 0 ? false : true} type="submit" className="btn btn-primary m-t-15 btn-block">{this.state.btnMessage == 0 ? "Add Bill" : "Adding Bill Please Wait.."}</button>
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


                                            </tr>
                                        </thead>
                                        <tbody>



                                            {this.state.companyAccountDataList.map((account) => (
                                                <tr key={account.id}>
                                                    <td>{account.id}</td>
                                                    <td>{account.company.name}</td>
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
