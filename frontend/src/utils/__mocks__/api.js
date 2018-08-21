const faker = require('faker');

export default {
    curryAPIFunc (apiFunc, id) {return (object) => apiFunc(id, object)},

    registerUser(email, password, firstName, lastName) {
        return new Promise((resolve, reject) => {
           let response = {status: 201, data:  {'user': faker.internet.email()}}
           resolve(response);
        });
    },

    getLoginToken(email, password) {
        return new Promise((resolve, reject) => {
            let response = {status: 200, data: {'user': faker.internet.email(), 'token': faker.random.number() }};
            resolve(response);
        })
    },

    getTrips() {
        return new Promise((resolve, reject) => {
            let trips = [faker.random.word(), faker.random.word()];
            let response = {status: 200, data: trips};
            resolve(response);
        })
    },

    createTrip(trip) {
        return new Promise((resolve, reject) => {
            let response = {status: 201, data: trip};
            resolve(response)
        })
    },

    patchTrip(trip) {
        return new Promise((resolve, reject) => {
            let response = {status: 201, data: trip};
            resolve(response)
        })
    },

    getTrip(id)  {
         const trip = {
            'id': id, 'name': faker.random.word(), 'created_by': faker.internet.email()
        };
        return new Promise((resolve, reject) => {
            let response = {status: 200, data: trip};
            resolve(response);
        });
    },

    deleteTrip(tripId) {
        return new Promise((resolve, reject) => {
            let response = {status: 204};
            resolve(response)
        })
    },

    searchCities(value) {
        return new Promise((resolve, reject) => {
            let response = {status: 200, data: [faker.address.city(),  faker.address.city()]};
            resolve(response);
        });
    },

    addDestinationToTrip(tripId, value) {
        return new Promise((resolve, reject) => {
            let response = {status: 200, data: value};
            resolve(response);
        });
    }
}