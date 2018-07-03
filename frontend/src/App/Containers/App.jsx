import React from "react";
import axios from "axios";
import {BrowserRouter, Redirect, Route} from "react-router-dom";

import LoggedInContainer from "App/Containers/LoggedInContainer";
import LoggedOutRoute from "App/Components/LoggedOutRoute";
import NavigationBar from "App/Components/NavigationBar";

import LoginContainer from "Auth/Containers/LoginContainer";
import RegistrationContainer from "Auth/Containers/RegistrationContainer";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        // Custom axios validation function
        axios.defaults.validateStatus = function (status) {
            return (status >= 200 && status < 300) || (status === 400)
        };

        axios.defaults.baseURL = '/api';
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <NavigationBar />

                    <div className="container">
                        {/*TODO: make sure logged in users can't access these*/}
                        <LoggedOutRoute path="/login" component={LoginContainer}/>
                        <LoggedOutRoute path="/register" component={RegistrationContainer}/>


                        <LoggedInContainer>
                            {<Redirect exact from="/" exact to="/trips"/>}
                            {<Redirect exact from="" exact to="/trips"/>}
                        </LoggedInContainer>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
