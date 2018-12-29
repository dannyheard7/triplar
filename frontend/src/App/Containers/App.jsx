import React from "react";
import {Route, Router, Switch} from "react-router-dom";
import {connect} from "react-redux";
import ReactGA from 'react-ga';
import {Helmet} from "react-helmet";

import {history} from "../../store";

import LoggedInContainer from "App/Containers/LoggedInContainer";
import HeaderAuthenticated from "App/Components/HeaderAuthenticated";
import HeaderUnauthenticated from "App/Components/HeaderUnauthenticated";
import Footer from "App/Components/Footer";
import LoginContainer from "Auth/Containers/LoginContainer";
import RegistrationContainer from "Auth/Containers/RegistrationContainer";
import TripCreateContainer from "Trips/Components/TripCreate";
import TripEditContainer from "../../Trips/Components/TripEdit";
import TripDelete from "../../Trips/Components/TripDelete";
import PlaceDetail from "../../Places/Components/PlaceDetail";
import {getCookie} from "../utils/utils";
import {verifyToken} from "../../Auth/utils/actions";
import TripDetail from "../../Trips/Components/TripDetail";
import TripList from "../../Trips/Components/TripList";
import ItinerariesOverview from "../../Itinerary/Components/ItinerariesOverview";
import LocationItinerary from "../../Itinerary/Components/LocationItinerary";

import 'App/styles/app.css';

export class App extends React.Component {
    componentDidMount() {
        if(!this.props.auth.successful) {
            const loginToken = getCookie('userToken');

            if (loginToken) {
                this.props.dispatch(verifyToken(loginToken));
            }
        }

        this.initializeReactGA();
    }

    initializeReactGA() {
        ReactGA.initialize('UA-130249377-1');
        ReactGA.pageview("/");
        history.listen(location => ReactGA.pageview(location.pathname));
    }

    render() {
        if(this.props.auth.successful) {
            return (
                <Router history={history}>
                    <LoggedInContainer token={this.props.auth.token}>
                        {this.getHeaderInfo()}
                        <div className="wrapper">
                            <HeaderAuthenticated/>
                            <div className="content">
                                <Route path="/(|trips)" exact component={TripList}/>
                                <Route path="/(|trips)" exact component={TripCreateContainer}/>

                                <Route path="/trips/:id" component={TripDetail}/>
                                <Route path="/trips/:id/edit" component={TripEditContainer}/>
                                <Route path="/trips/:id/delete" component={TripDelete} />

                                <Route path="/trips/:id" component={ItinerariesOverview}/>

                                <Route path="/trips/:tripId/itinerary/:itineraryId" component={LocationItinerary}/>

                                <Route path="*/place/:placeId" component={PlaceDetail}/>
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
                        {this.getHeaderInfo()}
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

    getHeaderInfo() {
        return (
            <Helmet>
                <title>Triplar</title>
                <meta name="description" content="Triplar is a travel organiser.
                 Plan single or multiple stops and see popular attractions for each city along the way." />
                <meta name="keyword" content="Triplar, travel organiser, travel planner, planner, cities,
                 multiple stops, popular attractions, city, holiday" />
                <meta name="viewport" content="width=device-width" />
            </Helmet>
        )
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

export default connect(mapStateToProps)(App);