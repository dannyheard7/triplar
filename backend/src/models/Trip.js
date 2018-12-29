import mongoose from "mongoose";

const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
    name: {type: String, required: true},
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    dateCreated: {type: Date, default: Date.now},
    dateModified: {type: Date, default:  Date.now},
    createdBy: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    locations: [{ type: Schema.Types.ObjectId, ref: 'TripLocation' }]
}, {collection:'Trip'});
tripSchema.plugin(uniqueValidator);


export default mongoose.model('Trip', tripSchema);
