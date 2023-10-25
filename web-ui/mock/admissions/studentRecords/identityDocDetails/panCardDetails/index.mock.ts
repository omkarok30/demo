import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';
import _ from 'lodash';
import { size } from 'lodash';

const responseData = [
  {
    id: '1',
    panNumber: 'CN1212121',
    panName: 'John Doe pan',
    panDob: '10/10/2010',
    panParentName: 'Bruee Lee pan',
    panDocument:
      'https://sveri-engg.s3.ap-south-1.amazonaws.com/1b7e2d7dfc82f41d4dae41526bb4bcaeb2cca90010.JPG',
  },
];

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/admissions/student_record/identity-docs/pancard/list',
    method: 'GET',
    body() {
      return {
        code: 200,
        data: {
          total: responseData.length,
          records: responseData,
        },
      };
    },
  },
  {
    url: '/:api?/:tenant?/v1/admissions/student_record/identity-docs/pancard/get/:id?',
    method: 'GET',
    body({ params }) {
      const rec = _.find(responseData, { id: params.id });
      return {
        code: 200,
        data: {
          total: size(rec),
          records: rec,
        },
      };
    },
  },
] as MockOptions;

export default defineMock(mockMethods);
