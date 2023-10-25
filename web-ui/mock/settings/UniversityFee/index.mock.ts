import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/settings/university_fee/list',
    method: 'GET',
    body({ body }) {
      return {
        code: 200,
        data: [
          {
            "key": 1,
            "id": 1,
            "universityfeehead": "sample 1"
          },
          {
            "key": 2,
            "id": 2,
            "universityfeehead": "Sample 2"
          }
        ],
      };
    },
  },
] as MockOptions;

export default defineMock(mockMethods);
