import Q from "q";
import axios from "axios";
import {backendHost} from "../../../App/utils/constants";

const faker = require('faker');

export default {
    getPopularPlaces(lat, lng, category) {
        const places = [{'id': faker.random.number(), 'name': faker.random.word(), 'image_url': faker.internet.url()}];
        return Promise.resolve({status: 200, data: {data: {popularPlaces: places}}});
    },

    searchPlacesByName(lat, lng, query) {
        const places = [{'id': faker.random.number(), 'name': query, 'image_url': faker.internet.url()}];
        return Promise.resolve({status: 200, data: {data: {places: places}}});
    },

    getPlaceDetails(placeId) {
        const place = {'id': faker.random.number(), 'name': faker.random.word(), 'photos': [faker.internet.url()],
            'rating': faker.random.number()};
        return Promise.resolve({status: 200, data: {data: {place: place}}});
    },

    getTopLevelCategories() {
        const categories = [{'name': faker.lorem.word(), 'alias': faker.random.word()},
            {'name': faker.lorem.word(), 'alias': faker.random.word()}];

        return Promise.resolve({status: 200, data: {data: {categories: categories}}});
    },

    getSubCategories(category, countryCode) {
        const categories = [{'name': faker.lorem.word(), 'alias': faker.random.word()},
            {'name': faker.lorem.word(), 'alias': faker.random.word()}];

        return Promise.resolve({status: 200, data: {data: {subCategories: categories}}});
    }
}