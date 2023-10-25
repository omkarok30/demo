import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';
import _ from 'lodash';
import { size } from 'lodash';


const data = [
  {
    id: "1",
    name: "PROCTOR",
  },
  {
    id: "2",
    name: "PROJECT",
  },
  {
    id: "3",
    name: "PRACTICAL",
  },
  {
    id: "4",
    name: "pranayam",
  },
  {
    id: "5",
    name: "tutorial",
  },
];
const mockMethods = [
    {
      url: '/:api?/:tenant?/v1/academics/timeTable/generalSessions/list',
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
      url: '/:api?/:tenant?/v1/academics/timeTable/generalSessions/get/:id?',
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
  
