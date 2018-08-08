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
        this.getTrips();
    }

    componentWillReceiveProps(props) {
        if(props.update) {
            this.getTrips();
        }
    }

    getTrips() {
        api.getTrips().then(res => {
            this.setState({trips: res.data});
        });
    }

    render() {
        return (<TripList trips={this.state.trips}/>);
    }
}