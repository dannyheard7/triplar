import {UserInputError, ApolloError} from 'apollo-server-express';

import Trip from '../models/Trip';
import City from "../models/City";
import TripLocation from "../models/TripLocation";
import {findCityByCityAndCountryName} from "../utils/city";
import TripLocationItem from "../models/TripLocationItem";
import {PlacesAPI} from "../plugins/yelpApi";
import {convertMongooseValidationErrorToGraphqlValidationError} from "../utils/validationError";

export default {
    Query: {
        locationDayItinerary: async (parent, {date, locationId}, {user}) => {
            const tripLocation =  await TripLocation.retrieveAndVerifyPermissions(locationId, user);

            const startTime = new Date(date).setHours(0,0,0,0);
            const endTime = new Date(date).setHours(23,59,59,59);

            const places = await TripLocationItem.find({
                _id: {$in: tripLocation.items},
                startTime: {$gte: startTime, $lte: endTime}, endTime: {$gte: startTime, $lte: endTime}
            });

            if (places.length > 0) {
                return {location: tripLocation, places: await PlacesAPI.getPlacesDetails(places.map(x => x.yelpPlaceId))}
            } else {
                return {location: tripLocation, places: []}
            }
        }
    },
    Mutation: {
        addTripLocation: async (parent, {input}, {user}) => {
            const {city, arrivalDate, departureDate, tripId} = input;
            const trip = await Trip.retrieveAndVerifyPermissions(tripId, user);

            let [cityName, countryName] = city.split(',').map(x => x.trim());
            const cityObj = await findCityByCityAndCountryName(cityName, countryName);

            try {
                const tripLocation = await TripLocation.create({city: cityObj._id, arrivalDate, departureDate, trip: trip._id});
                trip.locations.push(tripLocation._id);
                await trip.save();
                return tripLocation;
            } catch(e) {
                if(e.name === 'ValidationError') {
                    convertMongooseValidationErrorToGraphqlValidationError(e);
                } else {
                    throw new UserInputError(e.message);
                }
            }
        },
        updateTripLocation: async (parent, {input}, {user}) => {
            const {id, arrivalDate, departureDate} = input;
            const tripLocation =  await TripLocation.retrieveAndVerifyPermissions(id, user);

            tripLocation.set({arrivalDate, departureDate});
            return await tripLocation.save();
        },
        deleteTripLocation: async (parent, {id}, {user}) => {
            const tripLocation =  await TripLocation.retrieveAndVerifyPermissions(id, user);

            try {
                await tripLocation.remove();
                return true;
            } catch(e) {
                return false;
            }
        },
        addTripLocationItem: async(parent, {input}, {user}) => {
            const {locationId} = input;
            const location =  await TripLocation.retrieveAndVerifyPermissions(locationId, user);

            const tripLocationItem = await TripLocationItem.create({...input, location: location._id});
            location.items.push(tripLocationItem._id);
            await location.save();

            return tripLocationItem;
        },
        removeTripLocationItem: async(parent, {input}, {user}) => {
            const {locationId, yelpPlaceId} = input;
            const location =  await TripLocation.retrieveAndVerifyPermissions(locationId, user);

            try {
                const tripLocationItem = await TripLocationItem.findOne({location: location._id, yelpPlaceId});
                await tripLocationItem.remove();

                location.items.remove(tripLocationItem._id);
                await location.save();

                return true;
            } catch(e) {
                console.log(e.message);
                return false;
            }
        }
    },
    TripLocation: {
        city: async ({city}) => await City.findById(city),
        trip: async ({trip}) => await Trip.findById(trip)
    },
    TripLocationItem: {
        place: async({yelpPlaceId}) => {
            const places = await PlacesAPI.getPlacesDetails([yelpPlaceId]);

            if(places.length > 0) return places[0];
            else throw new ApolloError("Cannot load place info");
        }
    }
};