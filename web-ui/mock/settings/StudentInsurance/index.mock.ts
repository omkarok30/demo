import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/settings/student_insurance/list',
    method: 'GET',
    body({ body }) {
      return {
        code: 200,
        data: [
          {
            "key": 1,
            "id": 1,
            "student_insurance": "Health Insurance"
          },
          {
            "key": 2,
            "id": 2,
            "student_insurance": "Disability Insurance"
          }
        ],
      };
    },
  },
] as MockOptions;

export default defineMock(mockMethods);
