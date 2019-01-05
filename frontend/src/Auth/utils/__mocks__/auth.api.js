const faker = require('faker');

export default {
    registerUser(email, password, firstName, lastName) {
        return Promise.resolve({status: 201, data:  {'user': faker.internet.email()}});
    },

    passwordAuth(email, password) {
        return Promise.resolve({status: 200, data: {tokenAuth: {user: {email: faker.internet.email()},
                        'jwt': faker.random.number() }}});
    },
}