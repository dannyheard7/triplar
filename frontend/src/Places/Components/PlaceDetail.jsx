import React from "react";
import {getPlaceDetail} from "../utils/actions";
import {connect} from "react-redux";
import LoadingIndicator from "../../App/Components/LoadingIndicator";
import Modal from 'react-responsive-modal';
import MarkerMap from "../../Maps/Components/MarkerMap";

export class PlaceDetail extends React.Component {
    constructor(props) {
        super(props);

        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getPlaceDetail(this.props.match.params.placeId))
    }

    componentDidUpdate(prevProps) {
        if (this.props.place && prevProps.place && this.props.place.id !== prevProps.place.id) {
            this.props.dispatch(getPlaceDetail(this.props.match.params.placeId))
        }
    }

    closeModal() {
        this.props.history.goBack();
    }

    render() {
        const place = this.props.place;

        if (!place) {
            return <LoadingIndicator/>;
        } else {
            let position = [];
            let marker = {};

            if(place.coordinates) {
                position = [place.coordinates.latitude, place.coordinates.longitude];
                marker = {position: position, popupText: place.name};
            }

            return (
                <Modal open={true} onClose={this.closeModal} contentLabel={place.name} >
                    <h2>{place.name}</h2>
                    {place.location && <p> {place.location.displayAddress} </p>}
                    {place.rating && <p>Rating: {place.rating}</p>}
                    {place.displayPhone && <p>Phone: <a href={`tel:${place.displayPhone}`}>{place.displayPhone}</a></p>}
                    {place.photos && place.photos.map((image) => <img src={image} alt={place.name} height="100px" key={image}/>)}
                    {place.coordinates && <MarkerMap markers={[marker]} center={position} zoom={14}/> }
                    <button onClick={this.closeModal}>Close</button>
                </Modal>
            );
        }
    }
}

const mapStateToProps = (state, ownProps) => ({
    place: state.places.places.find(p => p.id === ownProps.match.params.placeId)
});

export default connect(mapStateToProps)(PlaceDetail)