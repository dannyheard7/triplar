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
        const result = renderer.render(<DateFieldGroup  value="31/08/2018" onSelect={jest.fn()}/>);
        expect(result).toMatchSnapshot();
    });

    test.skip('Pikaday instance is created on mount', () => {
        const onSelect = jest.fn()
        const container = shallow(<DateFieldGroup name="date" onSelect={onSelect} value="31/08/2018"/>);
        expect(pikaday).toBeCalledWith({"field": null, "format": "DD/MM/YYYY", "onSelect": () => onSelect("31/08/2018")});
    });

});