import axios from "axios";
import {backendHost} from '../../App/utils/constants';

export default {
    async getTrips() {
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

        return await axios.post(`${backendHost}/graphql`, {query: getTripsQuery});
    },

    async createTrip(trip) {
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

        return await axios.post(`${backendHost}/graphql`, {query: createTripQuery, variables: JSON.stringify(variables)});
    },

    async editTrip(tripId, trip) {
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

        return await axios.post(`${backendHost}/graphql`, {query: editTripQuery, variables: JSON.stringify(variables)});
    },

    async deleteTrip(tripId) {
        const deleteTripQuery = ` 
            mutation DeleteTrip {
              deleteTrip(id: "${tripId}")
        }`;

        return await axios.post(`${backendHost}/graphql`, {query: deleteTripQuery});
    },
}