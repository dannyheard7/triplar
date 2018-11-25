import React from "react";
import api from "Places/utils/places.api.js";
import PlaceListContainer from "Places/Containers/PlaceListContainer";

import "Places/styles/places.css";
import {getPopularPlaces, getTopLevelCategories} from "../utils/actions";
import { connect } from "react-redux";

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
        this.getPopularPlaces(this.state.selectedCategory);
        this.props.dispatch(getTopLevelCategories());
    }

    getPopularPlaces(category) {
        const city = this.props.city;
        this.props.dispatch(getPopularPlaces(city.location.lat, city.location.lng, category));
    }

    searchPlaces(category) {
        // Searches are not cached because they are not used multiple times!
        const city = this.props.city;
        const search = this.state.searchValue;

        api.searchPlacesByName(city.location.lat, city.location.lng, search, category).then(response => {
            this.setState({searchPlaces: response.data.data.places})
        });
    };

    getSubCategories() {
        api.getSubCategories(this.state.selectedCategory, this.props.city.country.code).then(response => {
            this.setState({subCategories: response.data.data.subCategories})
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
            let popularPlaces = this.props.popularPlaces.find(x => x.lat === city.location.lat &&
                    x.lng === city.location.lng && x.category === category);
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
                <PlaceListContainer places={places} path={this.props.path} />
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