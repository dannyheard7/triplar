import axios from "axios";
import Q from "q";
import {backendHost} from 'App/utils/constants';

export default {
    curryAPIFunc (apiFunc, id) {return (object) => apiFunc(id, object)},

    addLocationToTrip(tripId, location) {
        const mutateTripLocationQuery = ` 
            mutation AddTripLocation($input: TripLocationMutationInput!){
              result: addTripLocation(input: $input) {
                tripLocation {
                    id
                    startDate
                    endDate
                    city {
                        name
                        location                        
                        country {
                            name
                            code
                        }
                    }
                    trip {
                        id
                    }
                }
                errors {
                  field
                  messages
                }
              }
            }`;


        let variables = {input: {trip: tripId, ...location}};

        return Q.when(axios.post(`${backendHost}/api/graphql`, {query: mutateTripLocationQuery, variables: variables}));
    },

    getTripItineraries(tripId) {
        const getTripItinerariesQuery = ` 
           query{ 
            trip(id: ${tripId}) {
                locations {
                    id
                    startDate
                    endDate
                    trip {
                        id
                    }
                    city {
                        name
                        location
                        country {
                            name
                            code
                        }
                    }
                }
            }
           }`;

        return Q.when(axios.post(`${backendHost}/api/graphql`, {query: getTripItinerariesQuery}));
    },

    getItineraryDayDetail(itineraryId, date) {
        const getLocationDayItinerary = ` 
           query { 
            locationDayItinerary(date: "${date}", locationId: ${itineraryId}) {
                place {
                    id
                    name
                    imageUrl
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

        return Q.when(axios.post(`${backendHost}/api/graphql`, {query: getLocationDayItinerary}));
    },

    addPlaceToItineraryDay(tripLocationId, placeId, date, order) {
        const addTripLocationItemMutation = ` 
            mutation AddTripLocationItem($input: AddTripLocationItemMutationInput!){
              addTripLocationItem(input: $input) {
                tripLocationItem {
                  order
                  place {
                    id
                    name
                    imageUrl
                    coordinates {
                        latitude
                        longitude
                    }
                  }
                }
                errors {
                  field
                  messages
                }
              }
            }`;

        let variables = {input: {location: tripLocationId, apiPlace: placeId, order: order, startDate: date, endDate: date}};

        return Q.when(axios.post(`${backendHost}/api/graphql`, {query: addTripLocationItemMutation, variables: variables}));
    },

    removeItemFromItineraryDay(tripLocationId, placeId, date) {
        const removeTripLocationItemMutation = ` 
            mutation RemoveTripLocationItem($input: RemoveTripLocationItemMutationInput!){
              removeTripLocationItem(input: $input) {
                errors {
                  field
                  messages
                }
              }
            }`;

        let variables = {input: {location: tripLocationId, apiPlace: placeId, startDate: date, endDate: date}};
        return Q.when(axios.post(`${backendHost}/api/graphql`, {query: removeTripLocationItemMutation, variables: variables}));
    },

    searchCities(query) {
        const searchCities = ` 
           query { 
            cities(name: "${query}") {
                name
                country {
                    name
                }
            }
           }`;

        return Q.when(axios.post(`${backendHost}/api/graphql`, {query: searchCities}));
    },
}