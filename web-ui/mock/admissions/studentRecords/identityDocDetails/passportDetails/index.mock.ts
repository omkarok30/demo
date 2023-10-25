import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';
import _ from 'lodash';
import { size } from 'lodash';

const responseData = [
   {
    id: '1',
    passportNumber: '11435FT5',
    passportDob: '09/09/2009',
    passportFullName: 'John Doe pass',
    passportFatherName: 'Bruee Lee pas',
    passportIssueDate: '01/01/2011',
    passportExpiryDate: '01/01/2021',
    passportIssuePlace: 'Thane',
    passportAddress: 'Tower 12, Special Building 12, Pune, Hadapsar, 411027',
    passportPlaceOfBirth: 'Pune',
    passportDocument:
      'https://sveri-engg.s3.ap-south-1.amazonaws.com/1b7e2d7dfc82f41d4dae41526bb4bcaeb2cca90010.JPG',
  }, 
];

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/admissions/student_record/identity-docs/passport/list',
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
    url: '/:api?/:tenant?/v1/admissions/student_record/identity-docs/passport/get/:id?',
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
