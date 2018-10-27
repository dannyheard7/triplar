import axios from "axios";
import Q from "q";
import {backendHost} from 'App/utils/constants';

export default {
    curryAPIFunc (apiFunc, id) {return (object) => apiFunc(id, object)},

    addLocationToTrip(tripId, destination) {
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


        let variables = {input: {trip: tripId, ...destination}};

        return Q.when(axios.post(`${backendHost}/api/graphql`, {query: mutateTripLocationQuery, variables: variables}));
    },

    getLocationDayItinerary(tripLocationId, date) {
        const getLocationDayItinerary = ` 
           query { 
            locationDayItinerary(date: "${date}", locationId: ${tripLocationId}) {
                place {
                    id
                    name
                    imageUrl
                }
            }
           }`;

        return Q.when(axios.post(`${backendHost}/api/graphql`, {query: getLocationDayItinerary}));
    },

    addItemToTripLocation(tripLocationId, placeId, date, order) {
        const addTripLocationItemMutation = ` 
            mutation AddTripLocationItem($input: AddTripLocationItemMutationInput!){
              addTripLocationItem(input: $input) {
                tripLocationItem {
                  order
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