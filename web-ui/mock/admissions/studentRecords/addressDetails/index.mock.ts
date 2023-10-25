import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';
import _ from 'lodash';
import { size } from 'lodash';

const responseData = [
  {
    id: '1',
    address1: 'Lane 1',
    address2: 'Plot A',
    address3: 'Colony',
    locationType: 'urban',
    city: 'Pune',
    district: 'Pune',
    state: 'maharashtra',
    country: 'india',
    pincode: 411028,
    presentAddress1: 'Lane 2',
    presentAddress2: 'Plot B',
    presentAddress3: 'Colony',
    presentLocationType: 'rural',
    presentCity: 'Pandharpur',
    presentDistrict: 'solapur',
    presentState: 'maharashtra',
    presentCountry: 'india',
    presentPincode: 410302,
    guardianName: 'John Doe',
    guardianContactNo: 9083739089,
    guardianAddress1: 'Lane 3',
    guardianAddress2: 'Plot C',
    guardianAddress3: 'Colony',
    guardianLocationType: 'rural',
    guardianCity: 'Pimpri',
    guardianDistrict: 'pimpri',
    guardianState: 'maharashtra',
    guardianCountry: 'india',
    guardianPincode: 412048,
  },
  /* {
    id: '2',
    address1: 'Lane 11',
    address2: 'Plot AA',
    address3: 'Colony',
    locationType: 'urban',
    city: 'Pune',
    district: 'Pune',
    state: 'maharashtra',
    country: 'india',
    pincode: 411028,
    presentAddress1: 'Lane 22',
    presentAddress2: 'Plot BB',
    presentAddress3: 'Colony',
    presentLocationType: 'rural',
    presentCity: 'Pandharpur',
    presentDistrict: 'solapur',
    presentState: 'maharashtra',
    presentCountry: 'india',
    presentPincode: 410302,
    guardianName: 'John Doe',
    guardianContactNo: 9083739089,
    guardianAddress1: 'Lane 33',
    guardianAddress2: 'Plot CC',
    guardianAddress3: 'Colony',
    guardianLocationType: 'rural',
    guardianCity: 'Pimpri',
    guardianDistrict: 'pimpri',
    guardianState: 'maharashtra',
    guardianCountry: 'india',
    guardianPincode: 412048,
  }, */
];

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/admissions/student_record/address-details/list',
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
    url: '/:api?/:tenant?/v1/admissions/student_record/address-details/get/:id?',
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
