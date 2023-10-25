import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';
import _ from 'lodash';
import { size } from 'lodash';

const data = [
  {
    "id": "1",
    "empid": "1",
    "nameofdocument": "Marksheet",
    "uploaddocument": "",
  },
  {
    "id": "2",
    "empid": "2",
    "nameofdocument": "Aadhar Card",
    "uploaddocument": "",
  },
  {
    "id": "3",
    "empid": "3",
    "nameofdocument": "PAN Card",
    "uploaddocument": "",
  },
  {
    "id": "4",
    "empid": "4",
    "nameofdocument": "Passbook",
    "uploaddocument": "",
  },
];

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/EmployeeRecord/SearchEmployee/EmployeeDocument/list',
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
    url: '/:api?/:tenant?/v1/EmployeeRecord/SearchEmployee/EmployeeDocument/get/:id?',
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