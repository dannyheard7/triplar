import React from "react";
import axios from "axios";

import TripForm from "Trips/Components/TripForm";

export default class TripCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            trip: {},
            errors: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.create = this.create.bind(this);
    }

    handleChange(event) {
        let trip = this.state.trip;
        trip[event.target.name] = event.target.value;

        this.setState({trip: trip});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.create()
    }

    create () {
        axios.post("/trips/", this.state.trip).then(response => {
            if (response.status === 201) {
                this.setState({trip: {}, errors: []});
                this.props.onTripCreate(response.data);
            } else if (response.status === 400) {
                this.setState({errors: response.data})
            }
        });
    }

    render () {
        return (
            <div className="card">
                <TripForm onChange={this.handleChange} onSubmit={this.handleSubmit} submitLabel="Create"
                           errors={this.state.errors} />
            </div>
        )
    }
}