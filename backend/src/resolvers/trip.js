import Trip from '../models/Trip';
import User from '../models/User';

import {ForbiddenError} from "apollo-server-express";
import TripLocation from "../models/TripLocation";

export default {
    Query: {
        trips: async (parent, args, {user}) => await Trip.find({createdBy: user._id}),
        trip: async (parent, {id}, {user}) => {
            const trip = await Trip.findById(id);

            if (trip.createdBy.equals(user.id)) {
                return trip;
            }
            throw new ForbiddenError("You are not authorized to view this trip");
        }
    },
    Mutation: {
        createTrip: async (parent, {input}, {user}) => {
            const {name, startDate, endDate} = input;
            return await Trip.create({name, startDate, endDate, createdBy: user})
        },
        updateTrip: async (parent, {input}, {user}) => {
            const {id} = input;
            const trip =  await Trip.findById(id);

            if(trip.createdBy.equals(user._id)) {
                trip.set({...input});
                return await trip.save();
            } else {
                throw new ForbiddenError("You are not authorized to update this trip.");
            }
        },
        deleteTrip: async (parent, {id}, {user}) => {
            const trip =  await Trip.findById(id);

            if(trip.createdBy.equals(user._id)) {
                await trip.remove();
                return true;
            } else {
                throw new ForbiddenError("You are not authorized to delete this trip.");
            }
        },
    },
    Trip: {
        createdBy: async ({createdBy}) => await User.findById(createdBy),
        locations: async ({locations}) => await TripLocation.find({_id: {$in: locations}})
    }
};