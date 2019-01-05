import Moment from 'moment';

import { daysBetweenDates } from '../../utils/utils.js';

const faker = require('faker');

describe('daysBetweenDates', () => {

    test('returns correct format for single date', () => {
        let start_date = Moment(faker.date.past(10));
        let end_date = start_date.clone(); // .add(1, "days");

        let days = daysBetweenDates(start_date, end_date);

        expect(days).toEqual([start_date])
    });

    test('returns correct number of days between dates', () => {
        let num_days = faker.random.number();
        let start_date = Moment(faker.date.past(10));
        let end_date = start_date.clone().add(num_days, "days");

        let days = daysBetweenDates(start_date, end_date);

        expect(days.length).toEqual(num_days + 1)
    });

});