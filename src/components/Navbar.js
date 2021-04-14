import React, { Component } from 'react'

export class Navbar extends Component {
    render() {
        return (
            <nav className="navbar">
                <div className="container-fluid">
                    <div className="navbar-header">

                        <a href="#" className="bars" onClick={this.props.onBarClick}></a>
                        <a className="navbar-brand" href="#">Medic Portal</a>
                    </div>

                </div>
            </nav>
        )
    }
}

export default Navbar
