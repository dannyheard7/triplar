import {gql} from 'apollo-server-express';

export default gql`
    directive @isAuthenticated on FIELD_DEFINITION

  extend type Query {
    popularPlaces(latitude: Float!, longitude: Float!, category: String, limit: String): [Place] @isAuthenticated
    searchNearbyPlaces(term: String!, latitude: Float!, longitude: Float!, category: String, limit: String): [Place] @isAuthenticated
    place(id: String!): Place @isAuthenticated
    categories: [Category] @isAuthenticated
    category(alias: String!, countryCode: String): Category! @isAuthenticated
  }
 
  type Place {
    id: ID!
    name: String!
    url: String
    location: Location
    coordinates: Coordinates
    photos: [String],
    rating: Float,
    displayPhone: String
  }
  
  type Location {
    address: String
  }
  
  type Coordinates {
    latitude: Float!
    longitude: Float!
  }
  
  type Category {
      alias: String
      title: String
      subCategories: [Category]
      countryWhitelist: [YelpCountry]
      countryBlacklist: [YelpCountry]
  }
  
  type YelpCountry {
    code: String
  }
 
`;
