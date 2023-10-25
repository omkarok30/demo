import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/settings/student_insurance_structure/list',
    method: 'GET',
    body({ body }) {
      return {
        code: 200,
        data: [
          {
            "key": 1,
            "id": 1,
            "studInsStructure": "Health Insurance Structure",
            "studInsHead": "Health Insurance",
            "feeAmount": "2000"
          },
          {
            "key": 2,
            "id": 2,
            "studInsStructure": "Disability Insurance Structure",
            "studInsHead": "Disability Insurance",
            "feeAmount": "1000"
          },
          {
            "key": 2,
            "id": 2,
            "studInsStructure": "Travel Insurance Structure",
            "studInsHead": "Travel Insurance",
            "feeAmount": "1000"
          }
        ],
      };
    },
  },
] as MockOptions;

export default defineMock(mockMethods);
