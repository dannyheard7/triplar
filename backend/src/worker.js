import Queue from 'bull';
import {importCities, importCountries} from "./plugins/countriesImporter";
import mongoose from "mongoose";
import City from "./models/City";
import {MONGO_URL} from "./config/datastore";
import {REDIS_HOST, REDIS_PORT} from "./config/redis";
import {oneDayInSeconds, PlacesAPI} from "./plugins/yelpApi";
import redis from "redis";
import * as bluebird from "bluebird";
import logger from "./utils/logger";

bluebird.promisifyAll(redis);
const client = redis.createClient(REDIS_PORT, REDIS_HOST);

export const geoImporterQueue = new Queue('countries & cities importer', {redis: {port: REDIS_PORT, host: REDIS_HOST}});
export const categoriesImporterQueue = new Queue('yelp categories importer', {redis: {port: REDIS_PORT, host: REDIS_HOST}});
geoImporterQueue.empty();
categoriesImporterQueue.empty();

geoImporterQueue.process(async function (job, done) {
    try {
        const countries = await importCountries();
        await importCities(countries);
        done();
    } catch (e) {
        logger.error(e.message);
        throw e;
    } finally {
        mongoose.connection.close();
    }
});

if(mongoose.connection.readyState !== 1) {
    mongoose.connect(MONGO_URL);
}

City.countDocuments({}, function (err, count) {
    if (!count || count === 0) geoImporterQueue.add();
});

categoriesImporterQueue.process(async function (job, done) {
    try {
        const categories = await PlacesAPI.getAllCategories();
        let allCategories = {};

        categories.forEach((category, index, object) => {
            if (!category.parent_categories || category.parent_categories.length === 0) {
                allCategories[category.alias] = category;
                object.splice(index, 1);
            }
        });

        categories.forEach((category) => {
            category.parent_categories.forEach(({alias}) => {
                if (allCategories[alias] && allCategories[alias].subCategories) {
                    allCategories[alias].subCategories.push(category)
                } else if (allCategories[alias]) {
                    allCategories[alias].subCategories = [category];
                }
            })
        });

        await client.setAsync("yelp-categories", JSON.stringify(allCategories), 'EX', oneDayInSeconds);
        done();
    } catch (e) {
        logger.error(e.message);
        throw e;
    }
});

client.exists('yelp-categories', function (err, count) {
    if (!count || count === 0) categoriesImporterQueue.add();
});

// Run every night at midnight
categoriesImporterQueue.add(null, {repeat: {cron: '0 0 * * *'}});
