import City from '../models/City';
import Country from "../models/Country";

export default {
    Query: {
        cities: async (parent, {name, limit = 5}) => {
            let cities = City.find({name: new RegExp(name, "i")}).sort({'population': -1}).limit(limit);
            return cities ? cities : [];
        },
    },
    City: {
        country: async ({country}) => await Country.findById(country),
        latitude: async({latitude}) => parseFloat(latitude),
        longitude: async({longitude}) => parseFloat(longitude),
    }
};