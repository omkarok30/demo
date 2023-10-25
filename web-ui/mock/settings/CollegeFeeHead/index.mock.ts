import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/settings/college_fee_head/list',
    method: 'GET',
    body({ body }) {
      return {
        code: 200,
        data: [
          {
            "key": 1,
            "id": 1,
            "feehead": "Admission Fees",
            "type": "Income"
          },
          {
            "key": 2,
            "id": 2,
            "feehead": "Tution Fees",
            "type": "Miscellaneous income"
          }
        ],
      };
    },
  },
] as MockOptions;

export default defineMock(mockMethods);
