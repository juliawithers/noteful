import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import AddNote from './AddNote'

describe(`AddNote component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
            <AddNote />
            </BrowserRouter>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    })
    it('renders the UI as expected',() =>{
        const wrapper = shallow(<AddNote/>)
        expect(toJson(wrapper)).toMatchSnapshot();
    })
})



