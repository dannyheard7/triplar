import axios from "axios";
import Q from "q";

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

        return Q.when(axios.post("/api/graphql", {query: popularPlacesQuery}))
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

        return Q.when(axios.post("/api/graphql", {query: searchPlacesQuery}))
    },

    getPlaceDetails(placeId) {
        const searchPlacesQuery = ` 
           query { 
            place(id: "${placeId}") {
                name
                imageUrl
                location {
                    displayAddress
                }
                rating
                displayPhone
                photos
            }
           }`;

        return Q.when(axios.post("/api/graphql", {query: searchPlacesQuery}))
    }
}