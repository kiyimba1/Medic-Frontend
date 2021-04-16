import React, { Component } from 'react'
import APIHandler from '../utils/APIHandler';
import AuthHandler from '../utils/AuthHandler'

export class MedicineAddComponent extends Component {
    constructor(props) {
        super(props)
        this.formSubmit = this.formSubmit.bind(this)
    }

    state = {
        errorRes: false,
        errorMessage: "",
        btnMessage: 0,
        sendData: false,
        companylist: []


    }

    componentDidMount() {
        this.LoadCompany()
    }

    async LoadCompany() {

        var apiHandler = new APIHandler();
        var response = await apiHandler.fetchCompanyOnly()
        console.log(response)
        this.setState({ companylist: response.data })
    }

    async formSubmit(event) {
        event.preventDefault();
        this.setState({ btnMessage: 1 })
        var apiHandler = new APIHandler();
        var response = await apiHandler.saveMedicineData(event.target.bank_account_no.value, event.target.ifsc_no.value, this.props.match.params.id);
        // console.log(response);
        this.setState({ btnMessage: 0 })
        this.setState({ errorRes: response.data.errorRes })
        this.setState({ errorMessage: response.data.message })
        this.setState({ sendData: true })
        this.props.history.push("/companydetails/" + this.props.match.params.id)


    }





    render() {
        return (
            <section className="content">
                <div className="container-fluid">
                    <div className="block-header">
                        <h2>Manage Medicine</h2>
                    </div>
                    <div className="row clearfix">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="card">
                                <div className="header">

                                    <h2>
                                        ADD Medicine {this.props.match.params.id}
                                    </h2>

                                </div>
                                <div className="body">
                                    <form onSubmit={this.formSubmit}>
                                        <label htmlFor="name">Name</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" name="name" id="name" className="form-control" placeholder="Enter Name" />
                                            </div>
                                        </div>
                                        <label htmlFor="medical_type">Medical Type</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" name="medical_type" id="medical_type" className="form-control" placeholder="Enter Medical Type" />
                                            </div>
                                        </div>
                                        <label htmlFor="buy_price">Buy Price</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" name="buy_price" id="buy_price" className="form-control" placeholder="Enter Buy Price" />
                                            </div>
                                        </div>
                                        <label htmlFor="sell_price">Sell Price</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" name="sell_price" id="sell_price" className="form-control" placeholder="Enter Name" />
                                            </div>
                                        </div>
                                        <label htmlFor="c_gst">C GST</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" name="c_gst" id="c_gst" className="form-control" placeholder="Enter CGST Code" />
                                            </div>
                                        </div>
                                        <label htmlFor="s_gst">S GST</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" name="s_gst" id="s_gst" className="form-control" placeholder="Enter S GST Code" />
                                            </div>
                                        </div>
                                        <label htmlFor="batch_no">Batch No.</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" name="batch_no" id="batch_no" className="form-control" placeholder="Enter S GST Code" />
                                            </div>
                                        </div>
                                        <label htmlFor="shelf_no">Shelf No.</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" name="shelf_no" id="shelf_no" className="form-control" placeholder="Enter S GST Code" />
                                            </div>
                                        </div>
                                        <label htmlFor="expire_date">Expiry Date</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" name="expire_date" id="expire_date" className="form-control" placeholder="Enter Exp Date" />
                                            </div>
                                        </div>
                                        <label htmlFor="mfg_date">Mfg Date</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" name="mfg_date" id="mfg_date" className="form-control" placeholder="Enter Mfg Date" />
                                            </div>
                                        </div>


                                        <label htmlFor="description">Description</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" name="description" id="description" className="form-control" placeholder="Enter Description" />
                                            </div>
                                        </div>
                                        <label htmlFor="in_stock_total">Stock in Total</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" name="in_stock_total" id="in_stock_total" className="form-control" placeholder="Enter Total Stock " />
                                            </div>
                                        </div>
                                        <label htmlFor="description">Qty in Strip</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" name="qty_in_strip" id="qty_in_strip" className="form-control" placeholder="Enter Quantity in Strip" />
                                            </div>
                                        </div>
                                        <label htmlFor="company_id">Company</label>
                                        <div className="form-inline">
                                            <select className="form-control">
                                                {this.state.companylist.map((item) => (
                                                    <option value={item.id} key={item.id}>{item.name}</option>
                                                ))}
                                            </select>
                                        </div>


                                        <br />
                                        <button disabled={this.state.btnMessage == 0 ? false : true} type="submit" className="btn btn-primary m-t-15 btn-block">{this.state.btnMessage == 0 ? "Add Medicine" : "Adding Medicine Please Wait.."}</button>
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

export default MedicineAddComponent
