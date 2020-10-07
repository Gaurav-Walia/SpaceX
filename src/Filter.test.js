import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure, shallow } from 'enzyme';
import Filter from './Filter';

configure({adapter: new Adapter()});

describe('Filter Component', () => {

  it("should render Filter component", () => {
    const wrapper = shallow(<Filter />);
  });

  it('calls handleClick', () => {
    const spy = jest.spyOn(Filter.prototype, 'handleClick');
    const wrapper = mount(<Filter />);
    expect(spy).toHaveBeenCalled();
    spy.mockReset();
    spy.mockRestore();
  });
});