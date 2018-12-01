import React from "react";
import {connect} from "react-redux";
import {getTripItineraries} from "../utils/actions";
import {Link} from "react-router-dom";
import Moment from "moment";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import 'Itinerary/styles/itineraries.css';
import LocationAddContainer from "./LocationAdd";


export class ItinerariesOverview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showLocationAdd: false
        };

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.setState({showLocationAdd: !this.state.showLocationAdd});
    }

    componentDidMount() {
        this.props.dispatch(getTripItineraries(this.props.match.params.id));
    }

    render() {
        const trip = this.props.trip;
        const locations = this.props.locations;

        return (
            <div className="itineraries-overview">
                <h2>Locations</h2>
                <div className="itineraries-list">
                    {locations.map((location) =>
                        <div className="card" key={location.id}>
                            <Link to={`/trips/${trip.id}/itinerary/${location.id}`}>
                                <h3 className="card-title">{location.city.name}{location.city.country && ", " + location.city.country.name}</h3>
                            </Link>
                            <p className="card-text">
                                {Moment(location.startDate).format('Do MMMM')} - {Moment(location.endDate).format('Do MMMM')}
                            </p>
                        </div>
                    )}
                    <div className="card">
                        {this.state.showLocationAdd ?
                            <LocationAddContainer trip={trip}/> :
                            <button className="btn btn-primary" onClick={this.onClick}><FontAwesomeIcon icon={faPlus}/></button>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

ItinerariesOverview.defaultProps = {
    trip: {},
    locations: []
};

function mapStateToProps(state, ownProps) {
    return {
        trip: state.trips.trips.find(x => x.id === ownProps.match.params.id),
        locations: state.itineraries.locationItineraries.filter(x => x.trip.id === ownProps.match.params.id)
    };
}

export default connect(mapStateToProps)(ItinerariesOverview)
