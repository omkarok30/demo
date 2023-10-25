

import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';
import _ from 'lodash';
import { size } from 'lodash';


const data = [
  {
    id: "1",
    bloodGroup: "A+",
    noofDependents: "3",
    emergencyContactNumber: "0987654321",
    emergencyContactName: "Ganesh",
    nominee: "suresh",
    nomineeMobile: "2345678901",
    nomineeEmail: "xyz@gmail.com",
  },
];
const mockMethods = [
    {
      url: '/:api?/:tenant?/v1/employeerecord/searchemp/emeregency/list',
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
      url: '/:api?/:tenant?/v1/employeerecord/searchemp/emeregency/get/:id?',
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
