import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import NoteNav from './NoteNav'
// import renderer from 'react-test-renderer'

describe(`NoteNav component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <NoteNav />
            </BrowserRouter>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    })
    it('renders the UI as expected',() =>{
        const wrapper = shallow(<NoteNav/>)
        expect(toJson(wrapper)).toMatchSnapshot();
    })
})