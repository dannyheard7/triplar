import React from "react";
import api from "utils/api.js";

import TripList from "Trips/Components/TripList";

export default class TripListContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            trips: []
        };
    }

    componentDidMount() {
        api.getTrips().then(res => {
            this.setState({trips: res.data});
        });
    }

    componentWillReceiveProps(props) {
        if (props.createdTrip) {
            this.setState({
                trips: this.state.trips.concat([props.createdTrip])
            });
        }
    }

    render() {
        return (<TripList trips={this.state.trips}/>);
    }
}