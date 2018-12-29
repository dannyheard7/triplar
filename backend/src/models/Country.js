import mongoose from "mongoose";

const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const countrySchema = new Schema({
    _id: {type: String, required: true, maxLength: 2, unique: true},
    name: {type: String, required: true},
    nativeName: {type: String},
    altSpellings: [{type: String}],
    topLevelDomain:  [{type: String, maxLength: 5}],
    alpha2Code:  {type: String, required: true, maxLength: 2, unique: true},
    alpha3Code: {type: String, required: true, maxLength: 3, unqiue: true},
    demonym: String,
    timezones: [{type: String}],
    currencies: [{code: {type: String, maxLength: 3}, name: String, symbol: String}],
    callingCodes: [{type: String, maxLength: 4}],
    languages: [{iso639_1: String, iso639_2: String, name: String, nativeName: String}],
    capital: { type: Schema.Types.ObjectId, ref: 'City' },
    region: String,
    subRegion: String,
    latitude: {type: Schema.Types.Decimal128, required: true},
    longitude: {type: Schema.Types.Decimal128, required: true},
    borders: [{ type: String, ref: 'Country' }],
    area: Schema.Types.Decimal128,
    flag: {type: String, required: true},


    cities: [{ type: Schema.Types.ObjectId, ref: 'City' }]
}, {collection:'Country'});
countrySchema.plugin(uniqueValidator);

export default mongoose.model('Country', countrySchema);
