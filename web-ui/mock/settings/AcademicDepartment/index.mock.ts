import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';
import _ from 'lodash';

const data = [
  {
    "id": "1",
    "type": "academic",
    "degreeName": "FIRST YEAR DEPARTMENT",
    "degreeCode": "FY",
    "startYear": null,
    "endYear": null,
    "isDisabled": "true",
    "levelOfEducation": "UG",
    "facultyOfStudy": "ENGINEERING",
  }, {
    "id": "2",
    "type": "academic",
    "degreeName": "CIVIL ENGINEERING",
    "degreeCode": "CE",
    "startYear": "2008",
    "endYear": "2009",
    "levelOfEducation": "Diploma",
    "facultyOfStudy": "ENGINEERING",
  }, {
    "id": "3",
    "type": "academic",
    "degreeName": "COMPUTER ENGINEERING",
    "degreeCode": "",
    "startYear": "2021",
    "endYear": "",
    "levelOfEducation": "Diploma",
    "facultyOfStudy": "ENGINEERING",
  },
];

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/settings/departments/list/academic',
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
    url: '/:api?/:tenant?/v1/settings/departments/get/:id?',
    method: 'GET',
    body({ params }) {
      const obj = _.find(data, { id: params.id });
      return {
        code: 200,
        data: obj
      };
    },
  },
] as MockOptions;

export default defineMock(mockMethods);
