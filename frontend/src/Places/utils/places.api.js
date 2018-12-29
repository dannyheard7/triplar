import axios from "axios";
import Q from "q";
import {backendHost} from 'App/utils/constants';

export default {
    getPopularPlaces(latitude, longitude, category) {
        const popularPlacesQuery = ` 
           query { 
            popularPlaces(latitude: ${latitude}, longitude: ${longitude}, category: "${category}") {
                id
                name
                photos
            }
           }`;

        return Q.when(axios.post(`${backendHost}/graphql`, {query: popularPlacesQuery}))
    },

    searchPlacesByName(latitude, longitude, query, category) {
        const searchPlacesQuery = ` 
           query { 
            searchNearbyPlaces(latitude: ${latitude}, longitude: ${longitude}, term: "${query}", category: "${category}") {
                id
                name
                photos
            }
           }`;

        return Q.when(axios.post(`${backendHost}/graphql`, {query: searchPlacesQuery}))
    },

    getPlaceDetails(placeId) {
        const searchPlacesQuery = ` 
           query { 
            place(id: "${placeId}") {
                id
                name
                url
                photos
                location {
                    address
                }
                coordinates {
                    latitude
                    longitude
                }
                rating
                displayPhone
            }
           }`;

        return Q.when(axios.post(`${backendHost}/graphql`, {query: searchPlacesQuery}))
    },

    getTopLevelCategories() {
        const getTopLevelCategoriesQuery = ` 
           query {
              categories {
                title
                alias
              }
            }`;

        return Q.when(axios.post(`${backendHost}/graphql`, {query: getTopLevelCategoriesQuery}))
    },

    getSubCategories(category, countryCode) {
        const getSubCategoriesQuery = ` 
           query {
              category(alias: "${category}", countryCode: "${countryCode}") {
                subCategories {
                    title 
                    alias
                }
              }
            }`;

        return Q.when(axios.post(`${backendHost}/graphql`, {query: getSubCategoriesQuery}))
    }

}