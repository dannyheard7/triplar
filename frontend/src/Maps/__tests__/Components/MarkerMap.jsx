import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import MarkerMap from "../../Components/MarkerMap";

const renderer = new ShallowRenderer();
const faker = require('faker');


describe('<MarkerMap />', () => {
    test('renders correctly', () => {
        let center= [0.0, 0.0];
        const result = renderer.render(<MarkerMap center={center}/>);
        expect(result).toMatchSnapshot();
    });
});
