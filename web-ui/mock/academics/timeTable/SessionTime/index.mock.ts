import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';
import _ from 'lodash';
import { size } from 'lodash';

const data = [
  {
    id: "1",
    sessionid: "1",
    session: "1",
    fromTime: "00:10:09",
    toTime: "04:20:13",
    
  },
  {
    id: "2",
    sessionid: "2",
    session: "1",
    fromTime: '04:20:26',
    toTime: '10:20:09',
  },
  {
    id: "3",
    sessionid: "3",
    session: "1",
    fromTime: "04:20:10",
    toTime: "12:20:20",
  },
];

const mockMethods = [
    {
      url: '/:api?/:tenant?/v1/academics/TimeTable/SessionTime/list',
      method: 'GET',
      body() {
        return {
          code: 200,
          data: {
            total: data.length,
            records: data,
          }
        };
      },
    },
    {
      url: '/:api?/:tenant?/v1/academics/TimeTable/SessionTime/get/:id?',
      method: 'GET',
      body({ params }) {
        const rec = _.find(data, { id: params.id });
        return {
          code: 200,
          data: {
            total: size(rec),
            records: rec,
          },
        };
      },
    },
  ] as MockOptions;
  
  export default defineMock(mockMethods);