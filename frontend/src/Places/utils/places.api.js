import axios from "axios";
import {backendHost} from '../../App/utils/constants';

export default {
    async getPopularPlaces(latitude, longitude, category) {
        const popularPlacesQuery = ` 
           query { 
            popularPlaces(latitude: ${latitude}, longitude: ${longitude}, category: "${category}") {
                id
                name
                photos
            }
           }`;

        return await axios.post(`${backendHost}/graphql`, {query: popularPlacesQuery});
    },

    async searchPlacesByName(latitude, longitude, query, category) {
        const searchPlacesQuery = ` 
           query { 
            searchNearbyPlaces(latitude: ${latitude}, longitude: ${longitude}, term: "${query}", category: "${category}") {
                id
                name
                photos
            }
           }`;

        return await axios.post(`${backendHost}/graphql`, {query: searchPlacesQuery});
    },

    async getPlaceDetails(placeId) {
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

        return await axios.post(`${backendHost}/graphql`, {query: searchPlacesQuery});
    },

    async getTopLevelCategories() {
        const getTopLevelCategoriesQuery = ` 
           query {
              categories {
                title
                alias
              }
            }`;

        return await axios.post(`${backendHost}/graphql`, {query: getTopLevelCategoriesQuery});
    },

    async getSubCategories(category, countryCode) {
        const getSubCategoriesQuery = ` 
           query {
              category(alias: "${category}", countryCode: "${countryCode}") {
                subCategories {
                    title 
                    alias
                }
              }
            }`;

        return await axios.post(`${backendHost}/graphql`, {query: getSubCategoriesQuery});
    }

}