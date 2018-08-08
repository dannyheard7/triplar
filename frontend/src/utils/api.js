import axios from "axios";
import Q from "q";

export default {
    registerUser(email, password, firstName, lastName){
        return Q.when(axios.post("/register/", {'email': email, 'password': password,
            'first_name': firstName, 'last_name': lastName}));
    },

    getLoginToken(email, password) {
        return Q.when(axios.post("/token/", {'email': email, 'password': password}));
    },

    getTrips() {
        return Q.when(axios.get("/trips/"));
    },

    createTrip(trip) {
        return Q.when(axios.post("/trips/", trip));
    },

    getTrip(tripId) {
        return Q.when(axios.get("/trips/" + tripId));
    },

    patchTrip(trip) {
        return Q.when(axios.patch("/trips/" + trip.id, trip));
    },

    deleteTrip(tripId) {
        return Q.when(axios.delete("/trips/" + tripId));
    }
}