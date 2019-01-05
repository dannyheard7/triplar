const faker = require('faker');

export default {
    searchCities(value) {
        return Promise.resolve({status: 200, data: {data: {cities: [faker.address.city(),  faker.address.city()]}}});
    },

    addLocationToTrip(tripId, value) {
        return Promise.resolve({status: 200, data: value});
    }
}