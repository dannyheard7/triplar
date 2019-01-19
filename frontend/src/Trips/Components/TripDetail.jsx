import React from "react";
import Moment from 'moment';
import {connect} from "react-redux";
import LoadingIndicator from "../../App/Components/LoadingIndicator";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";
import {getTrips} from "../utils/actions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";

import styles from '../styles/Trip.module.css';

Moment.locale('en');

export class TripDetail extends React.Component {
    componentDidMount() {
        if(!this.props.trip) {
            // TODO: get trip detail
            this.props.dispatch(getTrips());
        }
    }

    render() {
        const trip = this.props.trip;

        if (!trip) {
            return <LoadingIndicator/>;
        } else {
            return (
                <div id="trip-detail">
                    <Helmet>
                        <title>{this.props.trip.name + " | Triplar"}</title>
                    </Helmet>
                    <div className="row">
                        <h1 id="trip-name">{trip.name}</h1>
                        <p className={styles.tripDates}>{Moment(trip.startDate).format('Do MMMM')} - {Moment(trip.endDate).format('Do MMMM')}</p>
                        <span>
                            <Link to={`/trips/${trip.id}/edit`} title={`Edit Trip ${trip.name}`}>
                                <button className="btn btn-primary btn-thin"><FontAwesomeIcon icon={faEdit}/></button>
                            </Link>
                            <Link to={`/trips/${trip.id}/delete`} title={`Delete Trip ${trip.name}`}>
                                <button className="btn btn-danger btn-thin"><FontAwesomeIcon icon={faTrashAlt}/></button>
                            </Link>
                        </span>
                    </div>
                    {trip.createdBy && <p className="created-by">Created by: {trip.createdBy.firstName} {trip.createdBy.lastName}</p>}
                </div>
            )
        }
    }
}

TripDetail.defaultProps = {
    trip: null,
};

function mapStateToProps(state, ownProps) {
    return {
        trip: state.trips.trips.find(x => x.id === ownProps.match.params.id),
    };
}

export default connect(mapStateToProps)(TripDetail)
