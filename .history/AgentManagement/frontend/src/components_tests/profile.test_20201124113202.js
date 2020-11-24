import React from 'react';
import renderer from 'react-test-renderer';
import Profile from '../components/profile';
import NavbarDash from "../components/NavbarDash";
import Sidebar from '../components/Sidebar'
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
configure({ adapter: new Adapter() });


describe('test case in update profile',() =>{
    test('renders list-items, to display button', () => {
        const wrapper = shallow(<Profile />);
        expect(wrapper.find('UpdateButton')).toBeDefined();
      })
      it('should render NavbarDash component correctly', () => {
        const component = shallow(<NavbarDash />);
        expect(component).toMatchSnapshot();
      });
    it('should render Sidebar component correctly', () => {
        const component = shallow(<Sidebar />);
        expect(component).toMatchSnapshot();
      });
    });