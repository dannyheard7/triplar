import mongoose from "mongoose";
import TripLocationItem from "./TripLocationItem";

const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const tripLocationSchema = new Schema({
    city: {type: Number, ref: 'TripLocation', required: true },
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    trip:  {type: Schema.ObjectId, ref: 'Trip', required: true },
    items: [{type: Schema.ObjectId, ref: 'TripLocationItem'}]
}, {collection:'TripLocation'});
tripLocationSchema.plugin(uniqueValidator);

tripLocationSchema.pre('remove', function(next) {
    TripLocationItem.remove({_id: { $in: this.items}}).exec();
    next();
});


export default mongoose.model('TripLocation', tripLocationSchema);
