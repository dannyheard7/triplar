import axios from "axios";
import Q from "q";

export default {
    registerUser(email, password, firstName, lastName){
        return Q.when(axios.post("/api/register/", {'email': email, 'password': password,
            'first_name': firstName, 'last_name': lastName}));
    },

    getLoginToken(email, password) {
        return Q.when(axios.post("/api/token/", {'email': email, 'password': password}));
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

    patchTrip(trip) {
        return Q.when(axios.patch("/api/trips/" + trip.id, trip));
    },

    deleteTrip(tripId) {
        return Q.when(axios.delete("/api/trips/" + tripId));
    },

    searchCities(query) {
        return Q.when(axios.get("/api/places/cities/search?query=" + query));
    }
}