import axios from "axios";
import Q from "q";

export default {
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