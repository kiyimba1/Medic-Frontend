import React, { Component } from 'react'
import APIHandler from '../utils/APIHandler';
import AuthHandler from '../utils/AuthHandler'

export class EmployeeDetailsComponent extends Component {
    constructor(props) {
        super(props)
        this.formSubmit = this.formSubmit.bind(this)
        this.addSalary = this.addSalary.bind(this)
    }

    state = {
        errorRes: false,
        errorMessage: "",
        btnMessage: 0,
        sendData: false,
        dataLoaded: false,
        errorResSalary: false,
        errorMessageSalary: "",
        btnMessageSalary: 0,
        sendDataSalary: false,
        dataLoadedSalary: false,
        employee: {},
        employeeSalary: [],
        employeeBank: []

    }

    componentDidMount() {
        AuthHandler.checkTokenExpiry()
    }

    async formSubmit(event) {
        event.preventDefault();
        this.setState({ btnMessage: 1 })
        var apiHandler = new APIHandler();
        var response = await apiHandler.updateEmployeeData(event.target.name.value, event.target.joining_date.value, event.target.phone.value, event.target.address.value, this.props.match.params.id);
        // console.log(response);
        this.setState({ btnMessage: 0 })
        this.setState({ errorRes: response.data.errorRes })
        this.setState({ errorMessage: response.data.message })
        this.setState({ sendData: true })
    }

    async addSalary(event) {
        event.preventDefault();
        var apiHandler = new APIHandler();
        var response = await apiHandler.addEmployeeSalaryData(this.props.match.params.id.value, event.target.salary_date.value, event.target.salary_amount.value);
        console.log(response)
        this.setState({ btnMessageSalary: 0 })
        this.setState({ errorResSalary: response.data.errorRes })
        this.setState({ errorMessageSalary: response.data.message })
        this.setState({ sendDataSalary: true })
    }

    // eslint-disable-next-line no-dupe-class-members
    componentDidMount() {
        this.fetchEmployeeDetails()
    }

    async fetchEmployeeDetails() {

        var apiHandler = new APIHandler();
        var employeedetails = await apiHandler.fetchEmployeeById(this.props.match.params.id)
        var employeesalary = await apiHandler.fetchSalaryEmployee(this.props.match.params.id)
        var employeebank = await apiHandler.fetchBankEmployee(this.props.match.params.id)
        this.setState({ employee: employeedetails.data.data })
        this.setState({ dataLoaded: true })

        console.log(employeesalary)
        this.setState({ employeeSalary: employeesalary.data })
        this.setState({ dataLoadedSalary: true })

        this.setState({ employeeBank: employeebank.data })

        // this.setState({ name: companydetails.data.data.name, license_no: companydetails.data.data.license_no, joining_date: companydetails.data.data.joining_date, contact_no: companydetails.data.data.contact_no, email: companydetails.data.data.email, description: companydetails.data.data.description })
        this.setState({ dataLoaded: true })

        // console.log(employeedetails)
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
                                {this.state.dataLoaded === false ? (
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
                                        Edit Employee
                                    </h2>

                                </div>
                                <div className="body">
                                    <form onSubmit={this.formSubmit}>
                                        <label htmlFor="name">Name</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="name" name="name" className="form-control" defaultValue={this.state.employee.name} />
                                            </div>
                                        </div>
                                        <label htmlFor="joining_date">Joining Date</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="joining_date" name="joining_date" className="form-control" placeholder="Enter License Number" defaultValue={this.state.employee.joining_date} />
                                            </div>
                                        </div>
                                        <label htmlFor="phone">Phone</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="phone" name="phone" className="form-control" placeholder="Enter joining_date" defaultValue={this.state.employee.phone} />
                                            </div>
                                        </div>
                                        <label htmlFor="address">Address</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="address" name="address" className="form-control" defaultValue={this.state.employee.address} />
                                            </div>
                                        </div>


                                        <br />
                                        <button disabled={this.state.btnMessage === 0 ? false : true} type="submit" className="btn btn-primary m-t-15 btn-block">{this.state.btnMessage === 0 ? "Update Employee" : "Updating Employee Please Wait.."}</button>
                                        <br />
                                        {this.state.errorRes === false && this.state.sendData === true ? (
                                            <div className="alert alert-success">
                                                {this.state.errorMessage}
                                            </div>
                                        ) : ""}
                                        {this.state.errorRes === true && this.state.sendData === true ? (
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
                                        Employee Salary
                                    </h2>
                                    <form onSubmit={this.addSalary}>
                                        <label htmlFor="salary_date">Salary Date</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="date" name="salary_date" id="salary_date" className="form-control" placeholder="Enter Name" />
                                            </div>
                                        </div>
                                        <label htmlFor="salary_amount">Salary Amount</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" name="salary_amount" id="salary_amount" className="form-control" placeholder="Enter Salary" />
                                            </div>
                                        </div>
                                        <br />
                                        <button disabled={this.state.btnMessageSalary === 0 ? false : true} type="submit" className="btn btn-primary m-t-15 btn-block">{this.state.btnMessageSalary === 0 ? "Add Salary" : "Adding Salary Please Wait.."}</button>
                                    </form>

                                </div>
                                <div className="body table-responsive">
                                    {this.state.dataLoadedSalary === false ? (
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
                                                <th>Salary Date</th>
                                                <th>Salary Amount</th>
                                                <th>Added On</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {this.state.employeeSalary.map((salary) => (
                                                <tr key={salary.id}>
                                                    <td>{salary.id}</td>
                                                    <td>{salary.salary_date}</td>
                                                    <td>{salary.salary_date}</td>
                                                    <td>{salary.added_on}</td>

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

export default EmployeeDetailsComponent
