import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/settings/college_fee_structure/list',
    method: 'GET',
    body({ body }) {
      return {
        code: 200,
        data: [
          {
            "key": 1,
            "id": 1,
            "feename": "Admission Fees ",
            "feehead": "Admission Fees",
            "amount": "10000",
            "type": "Income"
          },
          {
            "key": 2,
            "id": 2,
            "feename": "Tution Fees",
            "feehead": "Tution Fees",
            "amount": "40000",
            "type": "Miscellaneous income"
          }
        ],
      };
    },
  },
] as MockOptions;

export default defineMock(mockMethods);
