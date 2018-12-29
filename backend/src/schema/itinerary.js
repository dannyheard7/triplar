import {gql} from 'apollo-server-express';

export default gql`
    directive @isAuthenticated on FIELD_DEFINITION
    
    extend type Query {
        locationDayItinerary(date: Date!, locationId: ID!): LocationDayItinerary! @isAuthenticated
    }
  
  extend type Mutation {
    addTripLocation(input: TripLocationInput!): TripLocation! @isAuthenticated
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
    startDate: Date!,
    endDate: Date!,
    trip: Trip!
  }
  
  input TripLocationInput {
    city: String!,
    startDate: Date!,
    endDate: Date!,
    tripId: ID!
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
