import React from "react";
import api from "../utils/places.api.js";

import "../styles/places.css";
import {getPopularPlaces, getTopLevelCategories} from "../utils/actions";
import {connect} from "react-redux";
import DroppablePlaceListContainer from "./DroppablePlaceListContainer";

export class PlacesSearchContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchPlaces: [],
            selectedCategory: "",
            selectedSubCategory: "",
            subCategories: [],
            searchValue: "",
        };

        this.searchPlaces = this.searchPlaces.bind(this);
        this.getPopularPlaces = this.getPopularPlaces.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onSubCategoryChange = this.onSubCategoryChange.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getTopLevelCategories());

        if(this.props.city.latitude && this.props.city.longitude) {
            this.getPopularPlaces(this.state.selectedCategory)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.city !== this.props.city) {
            this.setState({selectedCategory: "", selectedSubCategory: ""},
                () => this.getPopularPlaces(this.state.selectedCategory));
        }
    }

    getPopularPlaces(category) {
        const city = this.props.city;
        this.props.dispatch(getPopularPlaces(city.latitude, city.longitude, category));
    }

    searchPlaces(category) {
        // Searches are not cached because they are not used multiple times!
        const city = this.props.city;
        const search = this.state.searchValue;

        api.searchPlacesByName(city.latitude, city.longitude, search, category).then(response => {
            this.setState({searchPlaces: response.data.data.searchNearbyPlaces})
        });
    };

    getSubCategories() {
        api.getSubCategories(this.state.selectedCategory, this.props.city.country.code).then(response => {
            this.setState({subCategories: response.data.data.category.subCategories})
        });
    }

    updatePlaces() {
        let category = this.state.selectedSubCategory ? this.state.selectedSubCategory : this.state.selectedCategory;

        if (this.state.searchValue.length >= 3) {
            this.searchPlaces(category);
        } else {
             this.getPopularPlaces(category);
        }
    }

    onSearchChange(event) {
        this.setState({searchValue:  event.target.value}, this.updatePlaces);
    }

    onCategoryChange(event) {
        this.setState({selectedCategory: event.target.value, selectedSubCategory: "", subCategories: []},
            () => {this.updatePlaces(); this.getSubCategories();});
    }

    onSubCategoryChange(event) {
        this.setState({selectedSubCategory: event.target.value},  this.updatePlaces);
    }

    render() {
        const city = this.props.city;
        let category = this.state.selectedSubCategory ? this.state.selectedSubCategory : this.state.selectedCategory;

        let places = [];
        if (this.state.searchValue.length >= 3) {
            places = this.state.searchPlaces;
        } else {
            let popularPlaces = this.props.popularPlaces.find(x => x.lat === city.latitude &&
                    x.lng === city.longitude && x.category === category);
            if(popularPlaces) {
                places = popularPlaces.places.map(x => this.props.places.find(p => p.id === x));
            }
        }

        return (
            <div className="places-search-container">
                <h3>Popular Places in {city.name}</h3>
                <input type="text" value={this.state.searchValue} onChange={this.onSearchChange}
                       placeholder="Search Places (min 3 characters)"/>
                <div>
                    <select onChange={this.onCategoryChange} defaultValue={this.state.selectedCategory} id="category-select">
                        <option value="">Any Category</option>
                        {this.props.categories.map(this.categoryAsOption)}
                    </select>
                    {this.state.selectedCategory.length > 0 &&
                        <select onChange={this.onSubCategoryChange} defaultValue={this.state.selectedSubCategory}
                                id="subcategory-select">
                            <option value="">Any Subcategory</option>
                            {this.state.subCategories && this.state.subCategories.map(this.categoryAsOption)}
                        </select>
                    }
                </div>
                <DroppablePlaceListContainer places={places} path={this.props.path} droppableId="placeSearchContainer"
                    className="places-list"/>
            </div>
        );
    }

    categoryAsOption(category) {
        return <option value={category.alias} key={category.alias}>{category.title}</option>
    }
}

PlacesSearchContainer.defaultProps = {
    popularPlaces: [],
    categories: []
};

const mapStateToProps = (state) => ({
    popularPlaces: state.places.popularPlaces,
    places: state.places.places,
    categories: state.places.topLevelCategories.categories
});

export default connect(mapStateToProps)(PlacesSearchContainer)