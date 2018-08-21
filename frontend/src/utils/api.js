import axios from "axios";
import Q from "q";

export default {
    curryAPIFunc (apiFunc, id) {return (object) => apiFunc(id, object)},

    registerUser(user){
        return Q.when(axios.post("/api/register/", user));
    },

    getLoginToken(user) {
        return Q.when(axios.post("/api/token/", user));
    },

    getTrips() {
        return Q.when(axios.get("/api/trips/"));
    },

    createTrip(trip) {
        return Q.when(axios.post("/api/trips/", trip));
    },

    getTrip(tripId) {
        return Q.when(axios.get("/api/trips/" + tripId));
    },

    patchTrip(tripId, trip) {
        return Q.when(axios.patch("/api/trips/" + tripId, trip));
    },

    deleteTrip(tripId) {
        return Q.when(axios.delete("/api/trips/" + tripId));
    },

    addDestinationToTrip(tripId, destination) {
         return Q.when(axios.post("/api/trips/" + tripId + "/destination", destination));
    },

    searchCities(query) {
        return Q.when(axios.get("/api/places/cities/search?query=" + query));
    }
}