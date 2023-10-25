import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';

const data = [
  {
    "id": "4",
    "degreeName": "LIBRARY",
    "degreeCode": "LIB",
    "type": "nonacademic",

  }, {
    "id": "5",
    "degreeName": "OFFICE",
    "degreeCode": "OFFICE",
    "type": "nonacademic",

  }, {
    "id": "6",
    "degreeName": "STORE",
    "degreeCode": "STORE",
    "type": "nonacademic",

  },
];

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/settings/departments/list/administrative',
    method: 'GET',
    body({ body }) {
      return {
        code: 200,
        data: {
          total: data.length,
          records: data,
        },
      };
    },
  },
] as MockOptions;

export default defineMock(mockMethods);
