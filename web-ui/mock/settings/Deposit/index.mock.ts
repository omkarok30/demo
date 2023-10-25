import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/settings/deposit/list',
    method: 'GET',
    body({ body }) {
      return {
        code: 200,
        data: [
          {
            "key": 1,
            "id": 1,
            "deposit_name": "Caution Money (Mandatory one-time deposit)"
          },
          {
            "key": 2,
            "id": 2,
            "deposit_name": "General Deposit"
          }
        ],
      };
    },
  },
] as MockOptions;

export default defineMock(mockMethods);
