import React, { Component } from 'react'
import GoogleFontLoader from 'react-google-font-loader'
import HomeComponent from './HomeComponent'
import Navbar from './Navbar'
import Overlay from './Overlay'
import Sidebar from './Sidebar'
import "adminbsb-materialdesign/css/themes/all-themes.css"

export class MainComponent extends Component {
    state = {
        bodyClass: "theme-red ls-closed",
        displayOverlay: "none",
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
    render() {
        if (window.screen.width > 1150) {
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
                <Sidebar />
                <HomeComponent />
            </React.Fragment>
        )
    }
}

export default MainComponent