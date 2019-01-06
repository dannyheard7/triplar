import mongoose from "mongoose";
import {ForbiddenError} from "apollo-server-express";
import TripLocation from "./TripLocation";

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

tripSchema.pre('remove', function(next) {
    TripLocation.deleteMany({_id: { $in: this.locations}}).exec();
    next();
});

tripSchema.statics.retrieveAndVerifyPermissions = async function(id, user) {
    const trip = await this.findById(id);

    if(trip.createdBy.equals(user._id)) {
        return trip;
    } else {
        throw new ForbiddenError("You are not authorized to modify this trip.");
    }
};


export default mongoose.model('Trip', tripSchema);
