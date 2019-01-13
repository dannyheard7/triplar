import {UserInputError} from 'apollo-server-express';

import Trip from '../models/Trip';
import User from '../models/User';
import TripLocation from "../models/TripLocation";
import {convertMongooseValidationErrorToGraphqlValidationError} from "../utils/validationError";

export default {
    Query: {
        trips: async (parent, args, {user}) => await Trip.find({createdBy: user._id}),
        trip: async (parent, {id}, {user}) => await Trip.retrieveAndVerifyPermissions(id, user)
    },
    Mutation: {
        createTrip: async (parent, {input}, {user}) => {
            const {name, startDate, endDate} = input;

            try {
                return await Trip.create({name, startDate: startDate, endDate: endDate, createdBy: user})
            } catch(e) {
                if(e.name === 'ValidationError') {
                    convertMongooseValidationErrorToGraphqlValidationError(e);
                } else {
                    throw new UserInputError(e.message);
                }
            }
        },
        updateTrip: async (parent, {input}, {user}) => {
            const {id} = input;
            const trip = await Trip.retrieveAndVerifyPermissions(id, user);

            trip.set({...input});
            return await trip.save();
        },
        deleteTrip: async (parent, {id}, {user}) => {
            const trip = await Trip.retrieveAndVerifyPermissions(id, user);

            try {
                await trip.remove();
                return true;
            } catch (e) {
                return false;
            }
        },
    },
    Trip: {
        createdBy: async ({createdBy}) => await User.findById(createdBy),
        locations: async ({locations}) => {
            try {
                return await TripLocation.find({_id: {$in: locations}})
            } catch(e) {
                return []
            }
        }
    }
};