import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/settings/misccharges/list',
    method: 'GET',
    body({ body }) {
      return {
        code: 200,
        data: [
          {
            "key": 1,
            "id": 1,
            "mischead": "user fees"
          },
          {
            "key": 2,
            "id": 2,
            "mischead": "Service charges"
          }
        ],
      };
    },
  },
] as MockOptions;

export default defineMock(mockMethods);
