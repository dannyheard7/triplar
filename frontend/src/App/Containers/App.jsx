import React from "react";
import {Route, Router, Switch} from "react-router-dom";
import {DragDropContext} from 'react-dnd';
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
import {connect} from "react-redux";
import {history} from "../../store";
import TripEditContainer from "../../Trips/Containers/TripEditContainer";
import TripDelete from "../../Trips/Components/TripDelete";
import PlaceDetail from "../../Places/Components/PlaceDetail";
import {getCookie} from "../utils/utils";
import {tokenRefresh} from "../../Auth/utils/actions";


export class App extends React.Component {
    componentDidMount() {
        if(!this.props.auth.successful) {
            const loginToken = getCookie('userToken');

            if (loginToken) {
                this.props.dispatch(tokenRefresh(loginToken));
            }
        }
    }

    render() {
        if(this.props.auth.successful) {
            return (
                <Router history={history}>
                    <LoggedInContainer token={this.props.auth.token}>
                        <div className="wrapper">
                            <HeaderAuthenticated/>
                            <div className="content">
                                <Route path="/(|trips)" exact component={TripListContainer}/>
                                <Route path="/(|trips)" exact component={TripCreateContainer}/>
                                <Route path="/trips/:id" component={TripDetailContainer}/>
                                <Route path="/trips/:id/edit" component={TripEditContainer}/>
                                <Route path="/trips/:id/delete" component={TripDelete} />
                                <Route path="/trips/:tripId/place/:placeId" component={PlaceDetail}/>
                            </div>
                            <Footer/>
                        </div>
                    </LoggedInContainer>
                </Router>
            );
        } else {
            return (
                <Router history={history}>
                    <div className="wrapper">
                        <HeaderUnauthenticated/>
                        <div className="content">
                            <Switch>
                                <Route path="/register" exact component={RegistrationContainer}/>
                                <Route path="/" component={LoginContainer}/>
                            </Switch>
                        </div>
                        <Footer/>
                    </div>
                </Router>
            );
        }
    }
}

const mapStateToProps = state => {
    if(state.auth.successful) {
        return {
            auth: {...state.auth, token: getCookie('userToken')}
        }
    } else {
        return {auth: state.auth}
    }
};

const connectedApp = connect(mapStateToProps)(App);

export default DragDropContext(HTML5Backend)(connectedApp)
