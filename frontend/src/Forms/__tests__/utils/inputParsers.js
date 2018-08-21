import Moment from 'moment';

import {inputParsers} from "Forms/utils/inputParsers.js";

const faker = require('faker');

describe('inputParsers', () => {

    test('date returns correct format', () => {
        let date = Moment(faker.date.past(10));

        let parsed_date = inputParsers.date(date.format("DD/MM/YYYY"));

        expect(parsed_date).toEqual(date.format("YYYY-MM-DD"));
    });

});