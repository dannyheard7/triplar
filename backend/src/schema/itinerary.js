import {gql} from 'apollo-server-express';

export default gql`
    directive @isAuthenticated on FIELD_DEFINITION
    
    extend type Query {
        locationDayItinerary(date: Date!, locationId: ID!): LocationDayItinerary! @isAuthenticated
    }
  
  extend type Mutation {
    addTripLocation(input: TripLocationInput!): TripLocation! @isAuthenticated
    updateTripLocation(input: TripLocationUpdateInput!): TripLocation! @isAuthenticated
    deleteTripLocation(id: ID!): Boolean! @isAuthenticated
    addTripLocationItem(input: TripLocationItemInput!): TripLocationItem! @isAuthenticated
    removeTripLocationItem(input: TripLocationItemInput!): Boolean! @isAuthenticated
  }
  
  type LocationDayItinerary {
    date: Date
    places: [Place]
    location: TripLocation!
  }
  
  type TripLocation {
    id: ID,
    city: City!
    arrivalDate: Date!,
    departureDate: Date!,
    trip: Trip!
  }
  
  input TripLocationInput {
    city: String!,
    arrivalDate: Date!,
    departureDate: Date!,
    tripId: ID!
  }
  
  input TripLocationUpdateInput {
    arrivalDate: Date!,
    departureDate: Date!
  }
  
  type TripLocationItem {
    startTime: Date!,
    endTime: Date!,
    order: Int!,
    place: Place,
    location: Location
  }
  
  input TripLocationItemInput {
    startTime: Date!,
    endTime: Date!,
    order: Int,
    yelpPlaceId: String,
    locationId: ID!
  }
 
`;
