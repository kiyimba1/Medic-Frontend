import React, { Component } from 'react'
import GoogleFontLoader from 'react-google-font-loader'
import Navbar from './Navbar'
import Overlay from './Overlay'
import Sidebar from './Sidebar'
import "adminbsb-materialdesign/css/themes/all-themes.css"

export class MainComponent extends Component {
    state = {
        bodyClass: "theme-red ls-closed",
        displayOverlay: "none",
        width: window.screen.width,
    };
    onBarClick = () => {
        if (this.state.bodyClass == "theme-red ls-closed overlay-open") {
            this.setState({ bodyClass: "theme-red ls-closed" })
            this.setState({ displayOverlay: "none" })
        } else if (this.state.bodyClass == "theme-red ls-closed") {
            this.setState({ bodyClass: "theme-red ls-closed overlay-open" })
            this.setState({ displayOverlay: "block" })
        }
    }

    componentDidMount() {
        var inputall = document.querySelectorAll("input")
        inputall.forEach((input) => {
            input.addEventListener("focus", function () {
                this.parentNode.className = "form-line focused"
            });
        });

        inputall.forEach((input) => {
            input.addEventListener("blur", function () {
                this.parentNode.className = "form-line"
            });
        });
    }

    onscreenresize = () => {
        this.setState({ width: window.screen.width });
    }

    componentWillMount() {
        window.addEventListener("resize", this.onscreenresize)
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.onscreenresize)
    }

    render() {
        console.log(this.props)
        if (this.state.width > 1150) {
            document.getElementById("root").className = "theme-red"
        } else {
            document.getElementById("root").className = this.state.bodyClass;
        }

        return (
            <React.Fragment>
                <GoogleFontLoader
                    fonts={[
                        {
                            font: 'Roboto',
                            weights: [400, 700],
                        }


                    ]}
                    subsets={['latin', 'cyrillic-ext']}
                />
                <GoogleFontLoader
                    fonts={[
                        {
                            font: 'Material+Icons'
                        }


                    ]}
                />

                <Overlay display={this.state.displayOverlay} />
                <Navbar onBarClick={this.onBarClick} />
                <Sidebar activepage={this.props.activepage} />
                <>{this.props.page}</>
            </React.Fragment>
        )
    }
}

export default MainComponent
