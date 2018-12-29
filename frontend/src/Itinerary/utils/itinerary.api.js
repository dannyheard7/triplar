import axios from "axios";
import Q from "q";
import {backendHost} from 'App/utils/constants';

export default {
    curryAPIFunc (apiFunc, id) {return (object) => apiFunc(id, object)},

    addLocationToTrip(tripId, location) {
        const mutateTripLocationQuery = ` 
            mutation AddTripLocation($input: AddTripLocationInput!){
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

        return Q.when(axios.post(`${backendHost}/graphql`, {query: mutateTripLocationQuery, variables: variables}));
    },

    getTripItineraries(tripId) {
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

        return Q.when(axios.post(`${backendHost}/graphql`, {query: getTripItinerariesQuery}));
    },

    getItineraryDayDetail(itineraryId, date) {
        const getLocationDayItinerary = ` 
           query {\ 
            locationDayItinerary(date: "${date}", locationId: "${itineraryId}") {\
                places {\
                    id\
                    name\
                    photos\
                    coordinates {\
                        latitude\
                        longitude\
                    }\
                }\
                itinerary : location {\
                    id\
                }\
            }\
           }`;

        return Q.when(axios.post(`${backendHost}/graphql`, {query: getLocationDayItinerary}));
    },

    addPlaceToItineraryDay(tripLocationId, placeId, date, order) {
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
        return Q.when(axios.post(`${backendHost}/graphql`, {query: addTripLocationItemMutation, variables}));
    },

    removeItemFromItineraryDay(tripLocationId, placeId, date) {
        const removeTripLocationItemMutation = ` 
            mutation RemoveTripLocationItem($input: TripLocationItemInput!) {
              removeTripLocationItem(input: $input)
            }`;

        let variables = {input: {locationId: tripLocationId, yelpPlaceId: placeId, startTime: date, endTime: date}};
        return Q.when(axios.post(`${backendHost}/graphql`, {query: removeTripLocationItemMutation, variables}));
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

        return Q.when(axios.post(`${backendHost}/graphql`, {query: searchCities}));
    },
}