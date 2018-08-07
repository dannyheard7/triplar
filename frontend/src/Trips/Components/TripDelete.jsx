import React from "react";
import api from "utils/api.js";

export default class TripDelete extends React.Component {
    constructor(props) {
        super(props);

        this.onDelete = this.onDelete.bind(this);
    }

    onDelete(e){
        api.deleteTrip(this.props.trip.id).then(response => {
            if (response.status === 204) {
                this.props.router.push('/trips');
            }
        });
    }

    render() {
        return (
            <div className = "modal"  role = "dialog" >
                <div className = "modal-dialog" role = "document" >
                    <div className = "modal-content">
                        <div className = "modal-header">
                            <h5 className = "modal-title" >Delete {this.props.trip.name}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p> Are you sure you want to delete the trip '{this.props.trip.name}'?</p>
                        </div>
                        <div className = "modal-footer" >
                            <button type = "button" className = "btn btn-danger" >Delete Trip</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}