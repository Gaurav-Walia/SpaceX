import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure, shallow } from 'enzyme';
import App from './App';

configure({adapter: new Adapter()});

describe('App Component', () => {

  it("should render App component", () => {
    const wrapper = shallow(<App />);
  });

  it('calls componentDidMount', () => {
    const spy = jest.spyOn(App.prototype, 'componentDidMount');
    const wrapper = mount(<App />);
    expect(spy).toHaveBeenCalled();
    spy.mockReset();
    spy.mockRestore();
  });

  it('test the state objects is set to null', done => { 
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse); 
    const mockFetchPromise = Promise.resolve({ 
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
    
    const wrapper = shallow(<App />); 
                            
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://api.spaceXdata.com/v3/launches?limit=100');

    process.nextTick(() => { 
      expect(wrapper.state()).toEqual({
          "land_success": null,
          "launch_success": null,
          "launch_year": null,
          "output": {}
      });

      global.fetch.mockClear(); 
      done(); 
    });
  });
});

