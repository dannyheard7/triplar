import mongoose from "mongoose";
import {ForbiddenError} from "apollo-server-express";

import TripLocationItem from "./TripLocationItem";

const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const tripLocationSchema = new Schema({
    city: {type: Number, ref: 'TripLocation', required: true },
    arrivalDate: {type: Date, required: true},
    departureDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return this.arrivalDate <= value;
            },
            message: "Departure date must be after arrival date"
        }
    },
    trip:  {type: Schema.ObjectId, ref: 'Trip', required: true },
    items: [{type: Schema.ObjectId, ref: 'TripLocationItem'}]
}, {collection:'TripLocation'});
tripLocationSchema.plugin(uniqueValidator);

tripLocationSchema.pre('remove', function(next) {
    TripLocationItem.deleteMany({_id: { $in: this.items}}).exec();
    next();
});

tripLocationSchema.statics.retrieveAndVerifyPermissions = async function(id, user) {
    const tripLocation = await this.findById(id).populate('trip');

    if(tripLocation.trip.createdBy.equals(user._id)) {
        return tripLocation;
    } else {
        throw new ForbiddenError("You are not authorized to modify this trip.");
    }
};

export default mongoose.model('TripLocation', tripLocationSchema);
