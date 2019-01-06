import axios from "axios";
import {backendHost} from '../../App/utils/constants';

export default {
    async addLocationToTrip(tripId, location) {
        const mutateTripLocationQuery = ` 
            mutation AddTripLocation($input: TripLocationInput!){
              result: addTripLocation(input: $input) {
                id
                startDate
                endDate
                trip {
                    id
                }
                city {
                    name
                    latitude
                    longitude                        
                    country {
                        name
                        code: alpha2Code
                    }
                }  
              }
            }`;


        let variables = {input: {tripId, ...location}};

        return await axios.post(`${backendHost}/graphql`, {query: mutateTripLocationQuery, variables: variables});
    },

    async deleteTripLocation(locationId) {
        const deleteTripLocationQuery = ` 
            mutation DeleteTripLocation {
              deleteTripLocation(id: "${locationId}")
        }`;

        return await axios.post(`${backendHost}/graphql`, {query: deleteTripLocationQuery});
    },

    async getTripItineraries(tripId) {
        const getTripItinerariesQuery = ` 
           query{ 
            trip(id: "${tripId}") {
                locations {
                    id
                    startDate
                    endDate
                    trip {
                        id
                    }
                    city {
                        name
                        latitude
                        longitude
                        country {
                            name
                            alpha2Code
                        }
                    }
                }
            }
           }`;

        return await axios.post(`${backendHost}/graphql`, {query: getTripItinerariesQuery});
    },

    async getItineraryDayDetail(itineraryId, date) {
        const getLocationDayItinerary = ` 
           query { 
            locationDayItinerary(date: "${date}", locationId: "${itineraryId}") {
                places {
                    id
                    name
                    photos
                    coordinates {
                        latitude
                        longitude
                    }
                }
                itinerary : location {
                    id
                }
            }
           }`;

        return await axios.post(`${backendHost}/graphql`, {query: getLocationDayItinerary});
    },

    async addPlaceToItineraryDay(tripLocationId, placeId, date, order) {
        const addTripLocationItemMutation = ` 
            mutation AddTripLocationItem($input: TripLocationItemInput!){
              addTripLocationItem(input: $input) {
                  order
                  place {
                    id
                    name
                    photos
                    coordinates {
                        latitude
                        longitude
                    }
                  }
              }
            }`;

        let variables = {input: {locationId: tripLocationId, yelpPlaceId: placeId, order: order, startTime: date, endTime: date}};
        return await axios.post(`${backendHost}/graphql`, {query: addTripLocationItemMutation, variables});
    },

    async removeItemFromItineraryDay(tripLocationId, placeId, date) {
        const removeTripLocationItemMutation = ` 
            mutation RemoveTripLocationItem($input: TripLocationItemInput!) {
              removeTripLocationItem(input: $input)
            }`;

        let variables = {input: {locationId: tripLocationId, yelpPlaceId: placeId, startTime: date, endTime: date}};
        return await axios.post(`${backendHost}/graphql`, {query: removeTripLocationItemMutation, variables});
    },

    async searchCities(query) {
        const searchCities = ` 
           query { 
            cities(name: "${query}") {
                name
                country {
                    name
                }
            }
           }`;

        return await axios.post(`${backendHost}/graphql`, {query: searchCities});
    },
}