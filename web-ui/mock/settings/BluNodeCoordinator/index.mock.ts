import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';
import _ from 'lodash';

const data = [
  {
    id: "1",
    category: "engineering",
    subCategory: "UG",
    userId: "1",
    employee_info$firstName: 'Trupti',
    employee_info$middleName: 'Lakshman',
    employee_info$lastName: 'Doke',

  
    
  },
  {
    id: "2",
    category: "overall_coordinator",
    subCategory:null,
    userId: "2",
    employee_info$firstName: 'Puja',
    employee_info$middleName: 'Lakshman',
    employee_info$lastName: 'chavan',
  },
];

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/settings/blunode_coordinator/list',
    method: 'GET',
    body({ body }) {
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
    url: '/:api?/:tenant?/v1/settings/blunode_coordinator/get/:id?',
    method: 'GET',
    body({ params }) {
      const obj = _.find(data, { id: params.id });
      return {
        code: 200,
        data: obj
      };
    },
  },
  {
    url: '/:api?/:tenant?/v1/settings/blunode_coordinator/listoverallcoordinator/:category?',
    method: 'GET',
    body({ params }) {
      const overalldata = [{}];
      const obj  = _.find(data, { category: 'overall_coordinator' });
      overalldata.push(obj);
      overalldata.shift();
      return {
        code: 200,
        data: overalldata
      };
    },
  },
  
] as MockOptions;

export default defineMock(mockMethods);
