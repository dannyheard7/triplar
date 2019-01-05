import redis from "redis";
import * as bluebird from "bluebird";
import {UserInputError} from "apollo-server-express";

import {REDIS_HOST, REDIS_PORT} from "../config/redis";
import {defaultCategories, PlacesAPI} from "../plugins/yelpApi";

bluebird.promisifyAll(redis);
const client = redis.createClient(REDIS_PORT, REDIS_HOST);


export default {
    Query: {
        popularPlaces: async (parent, {latitude, longitude, category = defaultCategories, limit = 8}) => {
            if(category === "") category = defaultCategories;

            return await PlacesAPI.getPopularPlaces(latitude, longitude, category, limit);
        },
        searchNearbyPlaces: async (parent, {term, latitude, longitude, category = defaultCategories, limit = 8}) => {
            if(category === "") category = defaultCategories;

            return await PlacesAPI.searchNearbyPlaces(term, latitude, longitude, category, limit);
        },
        place: async (parent, {id}) => {
            const response = await PlacesAPI.getPlacesDetails([id]);
            if(response.length > 0) return response[0];
            else throw new UserInputError("No place found")
        },
        categories: async () => {
            const categories = await client.getAsync("yelp-categories");

            if(categories) return Object.values(JSON.parse(categories));
            else return [];
        },
        category: async (parent, {alias}) => {
            const categories = await client.getAsync("yelp-categories");

            if(categories) {
                const categoriesObj = JSON.parse(categories);
                if (alias in categoriesObj) return categoriesObj[alias];
            }

            return []
        }
    },
};