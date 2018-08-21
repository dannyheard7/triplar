import React from "react";
import api from "Places/utils/places.api.js";
import PlaceDetail from "Places/Components/PlaceDetail";
import LoadingIndicator from "App/Components/LoadingIndicator";


export default class PlacesDetailContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            place: null
        };
    }

    componentDidMount() {
        this.getPlaceDetails(this.props.match.params.placeId);
    }

    getPlaceDetails(placeId) {
        api.getPlaceDetails(placeId).then(({data}) => {
            this.setState({place: data.data.place})
        });
    }

    render() {
        if(!this.state.place) {
            return <LoadingIndicator />;
        } else {
            return <PlaceDetail place={this.state.place}/>;
        }
    }
}