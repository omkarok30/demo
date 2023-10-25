import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/settings/university_fee_structure/list',
    method: 'GET',
    body({ body }) {
      return {
        code: 200,
        data: [
          {
            "key": 1,
            "id": 1,
            "universityStructure": "demo 1",
            "universityfee": "sample 1",
            "FeeAmount": "2000",
            "type": "Income"
          },
          {
            "key": 2,
            "id": 2,
            "universityStructure": "demo 2",
            "universityfee": "Sample 2",
            "FeeAmount": "1000",
            "type": "Miscellaneous income"
          }
        ],
      };
    },
  },
] as MockOptions;

export default defineMock(mockMethods);
