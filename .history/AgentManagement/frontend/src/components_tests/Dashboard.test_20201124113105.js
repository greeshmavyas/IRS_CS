import React from 'react';
import renderer from 'react-test-renderer';
import AgentCaseDisplay from '../components/AgentCaseDisplay'
import Dashboard from '../components/Dashboard'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
configure({ adapter: new Adapter() });

import NavbarDash from "../components/NavbarDash";
import Sidebar from '../components/Sidebar'

describe('Calling Dashboard components correctly', () => {
    it('should render AgentCaseDisplay component correctly', () => {
      const component = shallow(<AgentCaseDisplay />);
      expect(component).toMatchSnapshot();
    });
    test('renders list-items, to display submit button', () => {
        const wrapper = shallow(<Dashboard />);
        expect(wrapper.find('SubmitButton')).toBeDefined();
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