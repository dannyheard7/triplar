import {gql} from 'apollo-server-express';

import userSchema from './user';
import roleSchema from './role';
import tripSchema from './trip';
import itinerarySchema from './itinerary';
import geoSchema from './geo';
import placeSchema from './place';
import typeSchema from './types';

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [linkSchema, typeSchema, userSchema, roleSchema, tripSchema, itinerarySchema, geoSchema, placeSchema];