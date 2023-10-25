import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';
import _ from 'lodash';
import { size } from 'lodash';

const responseData = [
  {
    id: '1',
    voterIdNumber: '121279',
    voterIdDob: '11/11/2011',
    voterIdName: 'John Doe vote',
    voterIdFatherName: 'Bruee Lee vote',
    voterIdDocument:
      'https://sveri-engg.s3.ap-south-1.amazonaws.com/1b7e2d7dfc82f41d4dae41526bb4bcaeb2cca90010.JPG',
  },
];

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/admissions/student_record/identity-docs/voterid/list',
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
    url: '/:api?/:tenant?/v1/admissions/student_record/identity-docs/voterid/get/:id?',
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
