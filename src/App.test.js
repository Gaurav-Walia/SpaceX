import React from 'react';
import nock from 'nock';
import waitUntil from 'async-wait-until';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import App from './App';

configure({adapter: new Adapter()});

describe('<App />', () => {
  beforeAll(() => {
    nock('https://api.spaceXdata.com/v3')
    .persist()
    .get('/launches')
    .reply(200, "all the request");
  });

  it('Component fetching spacex missions from API', async(done) => {
    const root = shallow(<App />);
    let ComponentApp = {};
    await waitUntil(() => root.state('output').result != null);
    expect(ComponentApp.result).toEqual(2006);
    done();

  });
});
