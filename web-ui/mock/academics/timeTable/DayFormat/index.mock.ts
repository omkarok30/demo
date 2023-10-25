import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';
import _ from 'lodash';
import { size } from 'lodash';

const data = [
  {
    id: "1",
    nameofFormat: "PROJECT",
    weekoff: ['sunday'],
    isactive: true, 
  },
  {
    id: "2",
    nameofFormat: "PRACTCAL",
    weekoff: ['monday'],
    isactive: false, 
  },
  {
    id: "3",
    nameofFormat: "PASS",
    weekoff: ['tuesday'],
    isactive: true, 
  },
  {
    id: "4",
    nameofFormat: "abc",
    weekoff: ['wensday'],
    isactive: false, 
  },
];

const mockMethods = [
    {
      
      url: '/:api?/:tenant?/v1/academics/TimeTable/DayFormat/list',
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
      url: '/:api?/:tenant?/v1/academics/TimeTable/DayFormat/get/:id?',
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