import React from "react";

import Modal from 'react-responsive-modal';
import {connect} from "react-redux";
import {deleteTripLocation} from "../utils/actions";
import LoadingIndicator from "../../App/Components/LoadingIndicator";

export class LocationDelete extends React.Component {
    constructor(props) {
        super(props);

        this.onDelete = this.onDelete.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
        // Should do this or rewrite path?
        this.props.history.goBack();
    }

    onDelete(e) {
        this.props.dispatch(deleteTripLocation(this.props.itinerary.id, this.props.match.params.tripId));
    };

    render() {
        if(this.props.itinerary) {
            return (
                <Modal open={true} onClose={this.closeModal} contentLabel={this.props.itinerary.city.name} >
                    <h2>Remove {this.props.itinerary.city.name}?</h2>

                    <p>Are you sure you want to remove the location '{this.props.itinerary.city.name}'?</p>

                    <button onClick={this.closeModal}>Close</button>
                    <button className="btn-danger" onClick={this.onDelete}>Remove</button>
                </Modal>
            );
        } else {
            return <LoadingIndicator/>
        }
    }
}

function mapStateToProps(state, ownProps) {
  return {
      itinerary: state.itineraries.locationItineraries.find(x => x.id === ownProps.match.params.itineraryId),
  };
}

export default connect(mapStateToProps)(LocationDelete)