import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';
import _ from 'lodash';
import { size } from 'lodash';

const responseData = [
  {
    id: '1',
    admissionYear: '2021-22',
    admissionDate: '01-01-2022',
    class: 'Second Year',
    feesCategory: 'obc',
    hostellite: 'hostellite',
    parentOccupation: "other",
    otherOccupation: "Other occ 1",
    familyIncome: 123456,
    appliedGovernmentScholarship: 'Yes',
    ebcScholarship: 'Yes',
    governmentApplicationId: "Gov SCH 1",
    governmentAmount: 2222,
    governmentScheme: 'ABCV',
  },
];

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/admissions/student_record/beneficiary_details/following_classes/list',
    method: 'GET',
    body() {
      return {
        code: 200,
        data: {
          records: responseData,
        }
      };
    },
  },
  {
    url: '/:api?/:tenant?/v1/admissions/student_record/beneficiary_details/following_classes/get/:id?',
    method: 'GET',
    body({ params }) {
      const rec = _.find(responseData, { id: params.id });
      return {
        code: 200,
        data: {
          records: rec,
        },
      };
    },
  },
] as MockOptions;

export default defineMock(mockMethods);