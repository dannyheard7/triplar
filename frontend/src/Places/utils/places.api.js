import axios from "axios";
import Q from "q";
import {backendHost} from 'App/utils/constants';

export default {
    getPopularPlaces(lat, lng, category) {
        const popularPlacesQuery = ` 
           query { 
            popularPlaces(lat: ${lat}, lng: ${lng}, category: "${category}") {
                id
                name
                imageUrl
            }
           }`;

        return Q.when(axios.post(`${backendHost}/api/graphql`, {query: popularPlacesQuery}))
    },

    searchPlacesByName(lat, lng, query, category) {
        const searchPlacesQuery = ` 
           query { 
            places(lat: ${lat}, lng: ${lng}, name: "${query}", category: "${category}") {
                id
                name
                imageUrl
            }
           }`;

        return Q.when(axios.post(`${backendHost}/api/graphql`, {query: searchPlacesQuery}))
    },

    getPlaceDetails(placeId) {
        const searchPlacesQuery = ` 
           query { 
            place(id: "${placeId}") {
                id
                name
                imageUrl
                location {
                    displayAddress
                }
                coordinates {
                    latitude
                    longitude
                }
                rating
                displayPhone
                photos
            }
           }`;

        return Q.when(axios.post(`${backendHost}/api/graphql`, {query: searchPlacesQuery}))
    },

    getTopLevelCategories() {
        const getTopLevelCategoriesQuery = ` 
           query {
              categories {
                title
                alias
              }
            }`;

        return Q.when(axios.post(`${backendHost}/api/graphql`, {query: getTopLevelCategoriesQuery}))
    },

    getSubCategories(category, countryCode) {
        const getSubCategoriesQuery = ` 
           query {
              subCategories(category: "${category}", countryCode: "${countryCode}") {
                title
                alias
              }
            }`;

        return Q.when(axios.post(`${backendHost}/api/graphql`, {query: getSubCategoriesQuery}))
    }

}