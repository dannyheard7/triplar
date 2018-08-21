import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import LoggedInContainer from "App/Containers/LoggedInContainer";
import HeaderAuthenticated from "App/Components/HeaderAuthenticated";
import HeaderUnauthenticated from "App/Components/HeaderUnauthenticated";
import Footer from "App/Components/Footer";
import LoginContainer from "Auth/Containers/LoginContainer";
import RegistrationContainer from "Auth/Containers/RegistrationContainer";
import TripListContainer from "Trips/Containers/TripListContainer";
import TripCreateContainer from "Trips/Containers/TripCreateContainer";
import TripDetailContainer from "Trips/Containers/TripDetailContainer";

import 'App/styles/app.css';

export class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            token: null,
            user: null
        };

        this.onLogin = this.onLogin.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem("token") !== null && localStorage.getItem("user") !== null) {
          this.setState({isAuthenticated: true, token: localStorage.getItem("token"), user: JSON.parse(localStorage.getItem("user"))})
        }
    }

    onLogin(user, token) {
        this.setState({isAuthenticated: true, token: token, user: user})
    }

    onLogout() {
         this.setState({isAuthenticated: false, token: null, user: null});
    }

    render() {
        if(this.state.isAuthenticated) {
            return (
                <BrowserRouter>
                    <LoggedInContainer token={this.state.token}>
                        <div className="wrapper">
                            <Route path="/" render={(props) => <HeaderAuthenticated {...props} user={this.state.user}
                                                                                    onLogout={this.onLogout} />}/>
                            <div className="content">
                                <Route path="/(|trips)" exact component={TripListContainer}/>
                                <Route path="/(|trips)" exact component={TripCreateContainer}/>
                                <Route path="/trips/:id" component={TripDetailContainer}/>
                            </div>
                            <Footer />
                        </div>
                    </LoggedInContainer>
                </BrowserRouter>
            );
        } else {
            return (
                <BrowserRouter>
                    <div className="wrapper">
                        <HeaderUnauthenticated />
                        <div className="content">
                            <Switch>
                                <Route path="/register" exact component={RegistrationContainer}/>
                                <Route path="/" render={(props) => <LoginContainer {...props} onLogin={this.onLogin} />}/>
                            </Switch>
                        </div>
                        <Footer />
                    </div>
                </BrowserRouter>
            );
        }
    }
}


export default DragDropContext(HTML5Backend)(App)
