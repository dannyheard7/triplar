const faker = require('faker');

export default {
    curryAPIFunc(apiFunc, id) {
        return (object) => apiFunc(id, object)
    },

    getTrips() {
        return Promise.resolve({status: 200, data: {data: {trips: [faker.random.word(), faker.random.word()]}}});
    },

    createTrip(trip) {
        return Promise.resolve({status: 201, data: {data: {createTrip: {trip: trip}}}});
    },

    editTrip(trip) {
        return Promise.resolve({status: 201, data: {data: {editTrip: {trip: trip}}}});
    },

    getTripDetail(id) {
        const trip = {'id': id, 'name': faker.random.word(), 'created_by': faker.internet.email()};
        return Promise.resolve({status: 200, data: {data: {trip: trip}}});
    },

    deleteTrip(tripId) {
        return Promise.resolve({data: {data: {deleteTrip: {result: true}}}});
    },
}