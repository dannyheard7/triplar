import axios from "axios";
import Q from "q";
import {backendHost} from 'App/utils/constants';

export default {
    curryAPIFunc(apiFunc, id) {
        return (object) => apiFunc(id, object)
    },

    getTrips() {
        const getTripsQuery = ` 
           query { 
            trips {
                id
                name
                startDate
                endDate
                createdBy {
                    firstName
                    lastName
                }
                locations {
                    city {
                        name
                    }
                }
            }
           }`;

        return Q.when(axios.post(`${backendHost}/graphql`, {query: getTripsQuery}));
    },

    createTrip(trip) {
        const createTripQuery = ` 
            mutation CreateTrip($input: TripInput!){
              result: createTrip(input: $input) {
                id
                name
                startDate
                endDate
              }
            }`;

        let variables = {input: trip};

        return Q.when(axios.post(`${backendHost}/graphql`, {query: createTripQuery, variables: JSON.stringify(variables)}));
    },

    editTrip(tripId, trip) {
        const editTripQuery = ` 
            mutation UpdateTrip($input: TripInput!){
              result: updateTrip(input: $input) {
                id
                name
                startDate
                endDate
              }
            }`;

        let variables = {input: {id: tripId, ...trip}};

        return Q.when(axios.post(`${backendHost}/graphql`, {query: editTripQuery, variables: JSON.stringify(variables)}));
    },

    deleteTrip(tripId) {
        const deleteTripQuery = ` 
            mutation DeleteTrip {
              deleteTrip(id: "${tripId}")
        }`;

        return Q.when(axios.post(`${backendHost}/graphql`, {query: deleteTripQuery}));
    },
}