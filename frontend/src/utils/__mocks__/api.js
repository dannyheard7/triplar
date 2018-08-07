const faker = require('faker');

export default {

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

    getTrip(id)  {
         const trip = {
            'id': id, 'name': faker.random.word(), 'created_by': faker.internet.email()
        };
        return new Promise((resolve, reject) => {
            let response = {status: 200, data: trip};
            resolve(response);
        });
    }
}