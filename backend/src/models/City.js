import mongoose from "mongoose";
import Country from "./Country";

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


export default mongoose.model('City', citySchema);
