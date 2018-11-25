const faker = require('faker');

export default {
    curryAPIFunc (apiFunc, id) {return (object) => apiFunc(id, object)},

    searchCities(value) {
        return Promise.resolve({status: 200, data: {data: {cities: [faker.address.city(),  faker.address.city()]}}});
    },

    addLocationToTrip(tripId, value) {
        return Promise.resolve({status: 200, data: value});
    }
}