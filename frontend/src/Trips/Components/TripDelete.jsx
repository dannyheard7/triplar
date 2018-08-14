import React from "react";
import api from "utils/api.js";
import {withRouter} from "react-router-dom";

const $ = window.$;

export class TripDelete extends React.Component {
    constructor(props) {
        super(props);

        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount() {
        $("#deleteModal").modal("show");
    }

    onDelete(e) {
        api.deleteTrip(this.props.trip.id).then(response => {
            if (response.status === 204) {
                $("#deleteModal").modal("hide");
                this.props.history.push('/trips')
            }
        });
    };

    render() {
        return (
            <div className="modal" role="dialog" id="deleteModal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Delete {this.props.trip.name}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p> Are you sure you want to delete the trip '{this.props.trip.name}'?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={this.onDelete}>Delete Trip</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(TripDelete)