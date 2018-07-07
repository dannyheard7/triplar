import React from "react";
import axios from "axios";

import TripList from "Trips/Components/TripList";

export default class TripListContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            trips: []
        };
    }

    componentDidMount() {
        axios.get("/trips/").then(res => {
            const trips = res.data;
            this.setState({trips: trips});
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