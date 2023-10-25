import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';
import _ from 'lodash';
import { size } from 'lodash';

const responseData = [
  {
    id: '1',
    feesCategory: 'obc', 
    admissionCategory: 'ntb',
    admissionType: 'cap_1',
    admissionSubType: 'within_sanctioned_intake',
    hostellite: 'hostellite',
    parentOccupation: "other",
    otherOccupation: "Sheti",
    familyIncome: 123456,
    appliedGovernmentScholarship: 'Yes',
    governmentApplicationId: "Gov SCH 1",
    governmentAmount: 2222,
    governmentScheme: 'ABCV',
    appliedInstituteScheme: 'Yes',
    instituteScheme: ' DC1',
    instituteAmount: 10,
    appliedPrivateScheme: 'Yes',
    privateScheme: 'AC',
    privateAmount: 12256,
  },
];

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/admissions/student_record/beneficiary_details/list',
    method: 'GET',
    body() {
      return {
        code: 200,
        data: {
          total: responseData.length,
          records: responseData,
        }
      };
    },
  },
  {
    url: '/:api?/:tenant?/v1/admissions/student_record/beneficiary_details/get/:id?',
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