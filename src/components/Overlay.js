import React, { Component } from 'react'

export class Overlay extends Component {
    render() {
        return (
            <div className="overlay" style={{display: this.props.display}}></div>
        )
    }
}

export default Overlay
