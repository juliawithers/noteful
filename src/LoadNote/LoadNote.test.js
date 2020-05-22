import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import LoadNote from './LoadNote'
// import renderer from 'react-test-renderer'

describe(`LoadNote component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <LoadNote />
            </BrowserRouter>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    })
    it('renders the UI as expected',() =>{
        const wrapper = shallow(<LoadNote/>)
        expect(toJson(wrapper)).toMatchSnapshot();
    })
})