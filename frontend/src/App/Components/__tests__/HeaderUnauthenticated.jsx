import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import HeaderUnauthenticated from "../HeaderUnauthenticated";


const renderer = new ShallowRenderer();


describe('<HeaderUnauthenticated />', () => {

    test('renders correctly', () => {
        const result = renderer.render(<HeaderUnauthenticated  />);
        expect(result).toMatchSnapshot();
    });
});