import React from "react";
import {shallow} from "enzyme";
import DateFieldGroup from "../../Components/DateFieldGroup";
import ShallowRenderer from "react-test-renderer/shallow";

const renderer = new ShallowRenderer();
const faker = require('faker');

jest.mock('pikaday');

const pikaday = require('pikaday');

describe('<DateFieldGroup />', () => {

    test('renders correctly', () => {
        const result = renderer.render(<DateFieldGroup  value="2018-08-31"/>);
        expect(result).toMatchSnapshot();
    });

    test('Pikaday instance is created on mount', () => {
        const container = shallow(<DateFieldGroup name="date"/>);
        expect(pikaday).toBeCalledWith({"field": null, "format": "DD/MM/YYYY", "onSelect": undefined});
    });

    test('date is formatted correctly', () => {
        const container = shallow(<DateFieldGroup name="date"/>);
        let date = "2018-08-12";
        let formatted = container.instance().formatValue(date);
        expect(formatted).toEqual("12/08/2018");
    });

});