import React from 'react';
import renderer from 'react-test-renderer';
import Profile from '../components/profile';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
configure({ adapter: new Adapter() });

describe('test case in update profile',() =>{
    test('renders list-items, to display button', () => {
        const wrapper = shallow(<Profile />);
        expect(wrapper.find('UpdateButton')).toBeDefined();
      })
    });