import React from "react";
import api from "Places/utils/places.api.js";
import PlaceListContainer from "Places/Containers/PlaceListContainer";

import "Places/styles/places.css";

export default class PlacesSearchContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            popularPlacesCache: {},
            places: [],
            categoryValue: "",
            searchValue: "",
        };

        this.searchPlaces = this.searchPlaces.bind(this);
        this.getPopularPlaces = this.getPopularPlaces.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
    }

    componentDidMount() {
        this.getPopularPlaces();
    }

    getPopularPlaces() {
        const city = this.props.city;
        const category = this.state.categoryValue;

        if(category in this.state.popularPlacesCache) {
            this.setState({places: this.state.popularPlacesCache[category]})
        } else {
            api.getPopularPlaces(city.location.lat, city.location.lng, category).then(response => {
                let places = response.data.data.popularPlaces;

                this.setState({popularPlacesCache: {...this.state.popularPlacesCache, [category]: places}});
                this.setState({places: places});
            });
        }
    }

    searchPlaces() {
        // Searches are not cached because they are not used multiple times!
        const city = this.props.city;
        const search = this.state.searchValue;
        const category = this.state.categoryValue;

        api.searchPlacesByName(city.location.lat, city.location.lng, search, category).then(response => {
            this.setState({places: response.data.data.places})
        });
    };

    updatePlaces() {
         if (this.state.searchValue.length >= 3) {
            this.searchPlaces();
        } else {
             this.getPopularPlaces();
        }
    }

    onSearchChange(event) {
        this.setState({searchValue:  event.target.value}, this.updatePlaces);
    }

    onCategoryChange(event) {
        this.setState({categoryValue: event.target.value},  this.updatePlaces);
    }

    render() {
        const city = this.props.city;

        return (
            <div className="places-search-container">
                <h3>Popular Places in {city.name}</h3>
                <input type="text" value={this.state.searchValue} onChange={this.onSearchChange}
                       placeholder="Search Places (min 3 characters)"/>
                <select onChange={this.onCategoryChange} defaultValue={this.state.categoryValue}>
                    <option value="">Any Category</option>
                    <option value="restaurants">Restaurants</option>
                    <option value="nightlife">Nightlife</option>
                </select>
                <PlaceListContainer places={this.state.places} path={this.props.path} />
            </div>
        );
    }
}