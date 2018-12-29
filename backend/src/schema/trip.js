import {gql} from 'apollo-server-express';

export default gql`
    directive @isAuthenticated on FIELD_DEFINITION

  extend type Query {
    trips: [Trip!] @isAuthenticated
    trip(id: ID!): Trip @isAuthenticated
  }
  
  extend type Mutation {
    createTrip(input: TripInput!): Trip! @isAuthenticated
    updateTrip(input: TripInput!): Trip! @isAuthenticated
    deleteTrip(id: ID!): Boolean! @isAuthenticated
  }

  type Trip {
    id: ID
    name: String!
    startDate: Date!,
    endDate: Date!,
    createdBy: User!
    locations: [TripLocation!]
  }
  
  input TripInput {
    id: ID
    name: String!,
    startDate: Date!,
    endDate: Date!
  }
 
`;
