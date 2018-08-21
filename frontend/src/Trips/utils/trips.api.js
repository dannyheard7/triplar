import axios from "axios";
import Q from "q";

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

        return Q.when(axios.post("/api/graphql", {query: getTripsQuery}));
    },

    getTripDetail(tripId) {
        const getTripsQuery = ` 
           query{ 
            trip(id: ${tripId}) {
                id
                name
                startDate
                endDate
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
                        }
                    }
                    items {
                        place {
                            id
                            name
                            imageUrl
                        }
                    }
                }
            }
           }`;

        return Q.when(axios.post("/api/graphql", {query: getTripsQuery}));
    },

    createTrip(trip) {
        const createTripQuery = ` 
            mutation CreateTrip($input: TripMutationInput!){
              result: createTrip(input: $input) {
                trip {
                    id
                }
                errors {
                  field
                  messages
                }
              }
            }`;

        let variables = {input: trip};

        return Q.when(axios.post("/api/graphql", {query: createTripQuery, variables: JSON.stringify(variables)}));
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
                            }
                        }
                    }
                }
                errors {
                  field
                  messages
                }
              }
            }`;

        let variables = {input: {id: tripId, ...trip}};

        return Q.when(axios.post("/api/graphql", {query: editTripQuery, variables: JSON.stringify(variables)}));
    },

    deleteTrip(tripId) {
        const deleteTripQuery = ` 
            mutation DeleteTrip {
              deleteTrip(id: ${tripId}) {
                result
              }
            }`;

        return Q.when(axios.post("/api/graphql", {query: deleteTripQuery}));
    },
}