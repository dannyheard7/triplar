import axios from "axios";
import redis from "redis";
import * as bluebird from "bluebird";
import hashCode from "../utils/hashCode";
import {REDIS_HOST, REDIS_PORT} from "../config/redis";
import removeByVal from "../utils/removeByVal";

bluebird.promisifyAll(redis);
const client = redis.createClient(REDIS_PORT, REDIS_HOST);

export const defaultCategories = "active,arts,specialtyschools,tastingclasses,tours,localflavor,nightlife,landmarks,shopping";
export const oneDayInSeconds = 60 * 60 * 24;
const businessInfo = `\
    id\
    name\
    url\
    location {\
        address: formatted_address\
    }\
    coordinates {\
        latitude\
        longitude\
    }\
    rating\
    displayPhone: display_phone\
    photos\
`;

export class PlacesAPI {
    static async makeRequest(data) {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + process.env.YELP_ACCESS_TOKEN,
                'Content-Type': "application/graphql", 'Accept-Language': 'en_GB'
            }
        };

        try {
            const response = await axios.post("https://api.yelp.com/v3/graphql", data, config);

            if (response.data && response.data.data) {
                return response.data.data;
            } else {
                console.log(response);
                throw new Error("Problem with the yelp service");
            }
        } catch (e) {
            console.log(e.message);
            return [];
        }
    }

    static convertInputToHashCode(input) {
        return String(hashCode(Object.keys(input).reduce((result, key) => result + String(input[key]), "")));
    }

    static async checkCacheForSearch(input) {
        const hashCode = this.convertInputToHashCode(input);
        if (await client.existsAsync(hashCode)) {
            const ids = JSON.parse(await client.getAsync(hashCode));

            if(ids.length > 0) {
                return (await client.mgetAsync(...ids)).map(x => JSON.parse(x));
            } else {
                return [];
            }
        } else {
            return null;
        }
    }

    static async cacheSearch(input, businesses) {
        const businessIds = businesses.map(x => x.id);
        await client.setAsync(this.convertInputToHashCode(input), JSON.stringify(businessIds), 'EX', oneDayInSeconds);
        await client.multi(businesses.map(x => ["set", x.id, JSON.stringify(x), 'EX', oneDayInSeconds])).execAsync();
    }

    static async getPopularPlaces(latitude, longitude, categories, limit) {
        const cache = await this.checkCacheForSearch({type: 'popularPlaces', latitude, longitude, categories, limit});
        if (cache) return cache;

        const popularPlacesQuery = `{\
            search(latitude: ${latitude}, longitude: ${longitude}, categories: "${categories}", limit: ${limit}) {\
                business {\
                    ${businessInfo}\
                }\
            }\
        }`;

        const data = await this.makeRequest(popularPlacesQuery);

        if ('search' in data) {
            const businesses = data['search']['business'];
            await this.cacheSearch({type: 'popularPlaces', latitude, longitude, categories, limit}, businesses);
            return businesses;
        } else return data;
    }

    static async searchNearbyPlaces(term, latitude, longitude, categories, limit) {
        const cache = await this.checkCacheForSearch({type: 'searchPlaces', term, latitude, longitude, categories, limit});
        if (cache) return cache;

        const searchNearbyPlaces = `{\
            search(term: "${term}", latitude: ${latitude}, longitude: ${longitude}, categories: "${categories}", limit: ${limit}) {\
                business {\
                    ${businessInfo}\
                }\
            }\
        }`;

        const data = await this.makeRequest(searchNearbyPlaces);

        if ('search' in data) {
            const businesses = data['search']['business'];
            await this.cacheSearch({type: 'searchPlaces', term, latitude, longitude, categories, limit}, businesses);
            return businesses;
        } else return data;
    }

    static async getPlacesDetails(ids) {
        let businesses = (await client.mgetAsync(...ids)).reduce((arr, x) => {
            if(x) {
                ids = removeByVal(ids, x);
                arr.push(JSON.parse(x));
                return arr;
            }
        }, []);

        if(ids.length > 0) {
            let query = '{';

            for (let i = 0; i < ids.length; i++) {
                query = query.concat(`\
                    ${"business" + i}: business(id:"${ids[i]}") {\
                        ${businessInfo}\
                    }\
                `);
            }
            query = query.concat('}');

            const data = await this.makeRequest(query);
            const values = Object.values(data);

            if (values.length > 0) {
                await client.multi(values.map(x => ["set", x.id, JSON.stringify(x), 'EX', oneDayInSeconds])).execAsync();
                businesses = businesses.concat(values);
            }
        }

        return businesses;
    }
    
    static async getAllCategories() {
        const categoriesQuery = `{
            categories {
                category {
                    title
                    alias
                    parent_categories {
                        title
                        alias
                    }
                    country_whitelist {
                        code
                    }
                    country_blacklist {
                        code
                    }
                }
            }
        }`;

        const data = await this.makeRequest(categoriesQuery);

        if('categories' in data) {
            return data['categories']['category'];
        } else {
            throw new Error("Could not get yelp categories")
        }

    }
}
