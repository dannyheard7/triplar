import mongoose from "mongoose";
import Country from "./Country";
import {ValidationError} from "../utils/errors";

const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const citySchema = new Schema({
    _id: {type: Number, unique: true, required: true},
    name: {type: String, required: true},
    country: { type: String, ref: 'Country' },
    population: {type: Number, required: true},
    latitude: {type: Schema.Types.Decimal128, required: true},
    longitude: {type: Schema.Types.Decimal128, required: true},
    timezone: String

}, {collection:'City'});
citySchema.plugin(uniqueValidator);

citySchema.statics.findByCityAndCountryName = async function(cityName, countryName) {
    let cities = await this.find({name: cityName}).sort({'population': -1}).populate("country");
    cities = cities.filter(city =>city.country.name === countryName);

    if(cities.length === 0) {
        throw new ValidationError([{key: 'city', message: 'Could not find matching city'}])
    }

    return cities[0];
};


export default mongoose.model('City', citySchema);
