import React from 'react';
import nock from 'nock';
import waitUntil from 'async-wait-until';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import App from './App';

configure({adapter: new Adapter()});

// describe('<App />', () => {
//   beforeAll(() => {
//     nock('https://api.spaceXdata.com/v3')
//     .persist()
//     .get('/launches')
//     .reply(200, "all the request");
//   });

//   it('Component fetching spacex missions from API', async(done) => {
//     const root = shallow(<App />);
//     let ComponentApp = {};
//     await waitUntil(() => root.state('output').result != null);
//     expect(ComponentApp.result).toEqual(2006);
//     done();

//   });
// });

beforeAll(() => {
  global.fetch = jest.fn();
});

let wrapper;

beforeEach(() => {
  wrapper = shallow(<App />, { disableLifecycleMethods: true });
});

afterEach(() => {
  wrapper.unmount();
}); 

const spyDidMount = jest.spyOn(App.prototype, "componentDidMount");

fetch.mockImplementation(() => {
  return Promise.resolve({
    status: 200,
    json: () => {
      return Promise.resolve({
        mission_name: "FalconSat"
      });
    }

  });
});

const didMount = wrapper.instance().componentDidMount();

expect(spyDidMount).toHaveBeenCalled();

didMount.then(() => {
  wrapper.update();
  expect(wrapper.find("p.mission_name").text()).toContain("FalconSat");

  spyDidMount.mockRestore();
  fetch.mockClear();
  done();
});
