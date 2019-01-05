import Trip from '../models/Trip';
import City from "../models/City";
import TripLocation from "../models/TripLocation";
import {findCityByCityAndCountryName} from "../utils/city";
import TripLocationItem from "../models/TripLocationItem";
import {PlacesAPI} from "../plugins/yelpApi";

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
            const {city, startDate, endDate, tripId} = input;
            const trip = await Trip.retrieveAndVerifyPermissions(tripId, user);

            let [cityName, countryName] = city.split(',').map(x => x.trim());
            const cityObj = await findCityByCityAndCountryName(cityName, countryName);

            try {
                const tripLocation = await TripLocation.create({city: cityObj._id, startDate, endDate, trip: trip._id});
                trip.locations.push(tripLocation._id);
                await trip.save();
                return tripLocation;
            } catch(e) {
                console.log(e.message);
                throw new Error("Could not add trip location");
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
            const {locationId} = input;
            const location =  await TripLocation.retrieveAndVerifyPermissions(locationId, user);

            try {
                const tripLocationItem = await TripLocationItem.findOne({location: location._id, yelpPlaceId: input.yelpPlaceId});
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
            else throw new Error("Cannot load place info");
        }
    }
};