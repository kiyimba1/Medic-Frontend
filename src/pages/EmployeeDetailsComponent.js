import React, { Component } from 'react'
import APIHandler from '../utils/APIHandler';
import AuthHandler from '../utils/AuthHandler'


export class EmployeeComponent extends Component {
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
        employeeData: []

    }

    componentDidMount() {
        AuthHandler.checkTokenExpiry()
    }

    async formSubmit(event) {
        event.preventDefault();
        this.setState({ btnMessage: 1 })
        var apiHandler = new APIHandler();
        var response = await apiHandler.addEmployeeData(event.target.name.value, event.target.joining_date.value, event.target.phone.value, event.target.address.value);
        // console.log(response);
        this.setState({ btnMessage: 0 })
        this.setState({ errorRes: response.data.errorRes })
        this.setState({ errorMessage: response.data.message })
        this.setState({ sendData: true })
        this.updateData()

    }

    componentDidMount() {
        this.updateData()
    }




    viewEmployeeyDetails = (id) => {
        // console.log(id)
        // console.log(this.props)
        this.props.history.push("/employeedetails/" + id)
    }

    async updateData() {
        var apiHandler = new APIHandler();
        var employeedata = await apiHandler.fetchAllEmployeeData()
        this.setState({ employeeData: employeedata.data.data })
        this.setState({ dataLoaded: true })
    }

    render() {
        return (
            <section className="content">
                <div className="container-fluid">
                    <div className="block-header">
                        <h2>Manage Employee</h2>
                    </div>
                    <div className="row clearfix">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="card">
                                <div className="header">

                                    <h2>
                                        ADD Employee
                                    </h2>

                                </div>
                                <div className="body">
                                    <form onSubmit={this.formSubmit}>

                                        <label htmlFor="name">Name</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="name" name="name" className="form-control" placeholder="Enter Employee Name" />
                                            </div>
                                        </div>
                                        <label htmlFor="joining_date">Date of Joining</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="joining_date" name="joining_date" className="form-control" placeholder="Enter Employee Joining Date" />
                                            </div>
                                        </div>
                                        <label htmlFor="phone">Phone</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="phone" name="phone" className="form-control" placeholder="Enter Employee Phone" />
                                            </div>
                                        </div>
                                        <label htmlFor="address">Address</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="address" name="address" className="form-control" placeholder="Enter Employee Address" />
                                            </div>
                                        </div>




                                        <br />
                                        <button disabled={this.state.btnMessage == 0 ? false : true} type="submit" className="btn btn-primary m-t-15 btn-block">{this.state.btnMessage == 0 ? "Add Employee" : "Adding Employee Please Wait.."}</button>
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
                                        All Employees
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
                                                <th>Name</th>
                                                <th>Joined</th>
                                                <th>Phone</th>
                                                <th>Address</th>
                                                <th>ADDED ON</th>


                                            </tr>
                                        </thead>
                                        <tbody>



                                            {this.state.employeeData.map((employee) => (
                                                <tr key={employee.id}>
                                                    <td>{employee.id}</td>
                                                    <td>{employee.name}</td>
                                                    <td>{new Date(employee.joining_date).toLocaleString()}</td>
                                                    <td>{employee.phone}</td>
                                                    <td>{employee.address}</td>
                                                    <td>{new Date(employee.added_on).toLocaleString()}</td>


                                                    <td><button onClick={() => this.viewEmployeeDetails(employee.id)} type="button" className="btn btn-warning waves-effect">View</button></td>

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

export default EmployeeComponent
