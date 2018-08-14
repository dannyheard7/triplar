import React from "react";
import axios from "axios";
import {BrowserRouter, Route} from "react-router-dom";
import {connect} from "react-redux";

import LoggedInContainer from "App/Containers/LoggedInContainer";
import NavigationBar from "App/Components/NavigationBar";

import LoginContainer from "Auth/Containers/LoginContainer";
import RegistrationContainer from "Auth/Containers/RegistrationContainer";
import TripsContainer from "Trips/Containers/TripsContainer";
import TripDetailContainer from "Trips/Containers/TripDetailContainer";


export class App extends React.Component {
    constructor(props) {
        super(props);
        this.setupAxios();
    }

    setupAxios() {
        // Custom axios validation function
        axios.defaults.validateStatus = function (status) {
            return (status >= 200 && status < 300) || (status === 400)
        };
    }

    render() {
        if(this.props.isAuthenticated) {
            return (
                <BrowserRouter>
                    <div>
                        <NavigationBar />
                        <div className="container">
                            <LoggedInContainer>
                                <Route path="/" exact component={TripsContainer}/>
                                <Route path="/trips" exact component={TripsContainer}/>
                                <Route path="/trips/:id" component={TripDetailContainer}/>
                            </LoggedInContainer>
                        </div>
                    </div>
                </BrowserRouter>
            );
        } else {
            return (
                <BrowserRouter>
                    <div>
                        <NavigationBar />
                        <div className="container">
                            <Route path="/" exact component={LoginContainer} />
                            <Route path="/login" component={LoginContainer} />
                            <Route path="/register" component={RegistrationContainer}/>
                        </div>
                    </div>
                </BrowserRouter>
            );
        }
    }
}

function mapStateToProps(state, props) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
}

export default connect(mapStateToProps)(App)
