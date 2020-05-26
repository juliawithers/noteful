import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import NoteShortList from './NoteShortList'

describe(`NoteShortList component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <NoteShortList />
            </BrowserRouter>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    })
    it('renders the UI as expected',() =>{
        const wrapper = shallow(<NoteShortList/>)
        expect(toJson(wrapper)).toMatchSnapshot();
    })
})