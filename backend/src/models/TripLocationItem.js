import mongoose from "mongoose";

const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const tripLocationItemSchema = new Schema({
    startTime: {type: Date, required: true},
    endTime: {type: Date, required: true},
    order: {type: Number, required: true},
    yelpPlaceId: String,
    location:  {type: Schema.ObjectId, ref: 'TripLocation', required: true },
}, {collection:'TripLocationItem'});
tripLocationItemSchema.plugin(uniqueValidator);


export default mongoose.model('TripLocationItem', tripLocationItemSchema);
