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
                locations {
                    city {
                        name
                    }
                }
            }
           }`;

        return Q.when(axios.post(`${backendHost}/api/graphql`, {query: getTripsQuery}));
    },

    createTrip(trip) {
        const createTripQuery = ` 
            mutation CreateTrip($input: TripMutationInput!){
              result: createTrip(input: $input) {
                trip {
                    id
                    name
                    startDate
                    endDate
                }
                errors {
                  field
                  messages
                }
              }
            }`;

        let variables = {input: trip};

        return Q.when(axios.post(`${backendHost}/api/graphql`, {query: createTripQuery, variables: JSON.stringify(variables)}));
    },

    editTrip(tripId, trip) {
        const editTripQuery = ` 
            mutation EditTrip($input: TripMutationInput!){
              result: editTrip(input: $input) {
                trip {
                    id
                    name
                    startDate
                    endDate
                }
                errors {
                  field
                  messages
                }
              }
            }`;

        let variables = {input: {id: tripId, ...trip}};

        return Q.when(axios.post(`${backendHost}/api/graphql`, {query: editTripQuery, variables: JSON.stringify(variables)}));
    },

    deleteTrip(tripId) {
        const deleteTripQuery = ` 
            mutation DeleteTrip {
              deleteTrip(id: ${tripId}) {
                result
              }
            }`;

        return Q.when(axios.post(`${backendHost}/api/graphql`, {query: deleteTripQuery}));
    },
}