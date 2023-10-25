import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';
import _ from 'lodash';
import { size } from 'lodash';

const data = [
  {
    id: "1",
    empId: "1",
    programId:"2",
    fromYear:"2020",
    toYear:"2021"

  },
  {
    id: "2",
    empId: "1",
    programId:"3",
    fromYear:"2022",
    toYear:null

  },
];

const mockMethods = [
    {
      url: '/:api?/:tenant?/v1/employee/main_program/list',
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
      url: '/:api?/:tenant?/v1/employee/main_program/get/:id?',
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
