import React,  { Suspense, lazy } from "react";
import {Route, Router, Switch} from "react-router-dom";
import {connect} from "react-redux";
import ReactGA from 'react-ga';
import {Helmet} from "react-helmet";

import {history} from "../../store";
import {getCookie} from "../utils/utils";
import {verifyToken} from "../../Auth/utils/actions";
import '../styles/app.css';

import LoggedInContainer from "./LoggedInContainer";
import HeaderAuthenticated from "../Components/HeaderAuthenticated";
import HeaderUnauthenticated from "../Components/HeaderUnauthenticated";
import LoadingIndicator from "../Components/LoadingIndicator";
import Footer from "../Components/Footer";

const LoginContainer = lazy(() => import("../../Auth/Containers/LoginContainer"));
const RegistrationContainer = lazy(() => import("../../Auth/Containers/RegistrationContainer"));

const TripList = lazy(() => import("../../Trips/Components/TripList"));
const TripCreateContainer = lazy(() => import("../../Trips/Components/TripCreate"));
const TripEditContainer = lazy(() => import("../../Trips/Components/TripEdit"));
const TripDetail = lazy(() => import("../../Trips/Components/TripDetail"));
const TripDelete = lazy(() => import("../../Trips/Components/TripDelete"));

const ItinerariesOverview = lazy(() => import("../../Itinerary/Components/ItinerariesOverview"));
const LocationItinerary = lazy(() => import("../../Itinerary/Containers/LocationItinerary"));

const PlaceDetail = lazy(() => import("../../Places/Components/PlaceDetail"));


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

    wrapWithSuspense(Component) {
        return props => (
            <Suspense fallback={<LoadingIndicator/>}>
                <Component {...props} />
            </Suspense>
        );
    }

    render() {
        if(this.props.auth.successful) {
            return (
                <Router history={history}>
                    <LoggedInContainer token={this.props.auth.user.jwt}>
                        {this.getHeaderInfo()}
                        <div className="wrapper">
                            <HeaderAuthenticated/>
                            <div className="content">
                                <Route path="/(|trips)" exact component={this.wrapWithSuspense(TripList)}/>
                                <Route path="/(|trips)" exact component={this.wrapWithSuspense(TripCreateContainer)}/>

                                <Route path="/trips/:id" component={this.wrapWithSuspense(TripDetail)}/>
                                <Route path="/trips/:id/edit" component={this.wrapWithSuspense(TripEditContainer)}/>
                                <Route path="/trips/:id/delete" component={this.wrapWithSuspense(TripDelete)} />

                                <Route path="/trips/:id" component={this.wrapWithSuspense(ItinerariesOverview)}/>

                                <Route path="/trips/:tripId/itinerary/:itineraryId" component={this.wrapWithSuspense(LocationItinerary)}/>

                                <Route path="*/place/:placeId" component={this.wrapWithSuspense(PlaceDetail)}/>
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
                                <Route path="/register" exact component={this.wrapWithSuspense(RegistrationContainer)}/>
                                <Route path="/" component={this.wrapWithSuspense(LoginContainer)}/>
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
    return {auth: state.auth};
};

export default connect(mapStateToProps)(App);