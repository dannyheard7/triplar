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
            selectedCategory: "",
            selectedSubCategory: "",
            categories: [],
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

        api.getTopLevelCategories().then(response => {
            this.setState({categories: response.data.data.categories})
        });
    }

    getPopularPlaces(category) {
        const city = this.props.city;

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

    searchPlaces(category) {
        // Searches are not cached because they are not used multiple times!
        const city = this.props.city;
        const search = this.state.searchValue;

        api.searchPlacesByName(city.location.lat, city.location.lng, search, category).then(response => {
            this.setState({places: response.data.data.places})
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

        return (
            <div className="places-search-container">
                <h3>Popular Places in {city.name}</h3>
                <input type="text" value={this.state.searchValue} onChange={this.onSearchChange}
                       placeholder="Search Places (min 3 characters)"/>
                <div>
                    <select onChange={this.onCategoryChange} defaultValue={this.state.selectedCategory} id="category-select">
                        <option value="">Any Category</option>
                        {this.state.categories.map(this.categoryAsOption)}
                    </select>
                    <select onChange={this.onSubCategoryChange} defaultValue={this.state.selectedSubCategory} id="subcategory-select">
                        <option value="">Any Subcategory</option>
                        {this.state.subCategories.map(this.categoryAsOption)}
                    </select>
                </div>
                <PlaceListContainer places={this.state.places} path={this.props.path} />
            </div>
        );
    }

    categoryAsOption(category) {
        return <option value={category.alias}>{category.title}</option>
    }
}