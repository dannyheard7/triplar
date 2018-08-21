import React from "react";
import api from "Trips/utils/trips.api.js"

import TripDetail from "Trips/Components/TripDetail";
import TripManagement from "Trips/Components/TripManagement";
import TripDelete from "Trips/Components/TripDelete";
import TripEditContainer from "Trips/Containers/TripEditContainer";
import {Route} from "react-router-dom";
import LoadingIndicator from "App/Components/LoadingIndicator";

export default class TripDetailContainer extends React.Component {
     constructor(props) {
        super(props);

        this.state = {
            trip: null,
        };

        this.onUpdate = this.onUpdate.bind(this);
    }

    componentDidMount() {
        api.getTripDetail(this.props.match.params.id).then(response => {
            this.setState({ trip: response.data.data.trip })
        });
    }

    onUpdate(trip) {
        this.setState({trip: trip});
    }

    render() {
        const trip = this.state.trip;

        if (!trip) {
            return <LoadingIndicator />;
        } else {
            return (
                <div>
                    <TripDetail trip={trip}/>
                    <TripManagement trip={trip}/>
                    <Route path="/trips/:id/edit"  render={(props) => <TripEditContainer {...props} trip={trip}
                                                                                         onUpdate={this.onUpdate} />}/>
                    <Route path="/trips/:id/delete"  render={(props) => <TripDelete {...props} trip={trip} />} />
                </div>
            );
        }
    }
}