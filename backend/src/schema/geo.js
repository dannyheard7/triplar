import {gql} from 'apollo-server-express';

export default gql`  
   directive @isAuthenticated on FIELD_DEFINITION

  extend type Query {
    cities(name: String = ""): [City!] @isAuthenticated
  }

  type City {
    id: ID
    name: String!,
    country: Country!,
    population: Int,
    latitude: Float,
    longitude: Float,
  }  
  
  type Country {
    id: ID
    name: String!,
    alpha2Code: String,
    alpha3Code: String
  } 
`;
