import React from "react";
import {shallow} from "enzyme";
import DateFieldGroup from "../../Components/DateFieldGroup";
import Moment from 'moment';
import ShallowRenderer from "react-test-renderer/shallow";

const renderer = new ShallowRenderer();
const faker = require('faker');

describe('<DateFieldGroup />', () => {

    test('renders correctly', () => {
        const result = renderer.render(<DateFieldGroup  />);
        expect(result).toMatchSnapshot();
    });

    test('onChange calls onChange prop with formatted value', () => {
        const value = faker.date.recent();
        const stub = jest.fn();

        const container = shallow(<DateFieldGroup onChange={stub} name="date"/>);
        container.instance().onChange(value);

        const formatted_date = Moment(value).format('YYYY-MM-DD');

        expect(stub).toBeCalledWith({target: {name: "date", value: formatted_date}});
    });

});