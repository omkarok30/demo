import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';

const data = [
  {
    id: '1',
    name: 'SVERI',
    displayName: 'SVERI’s College of Engineering, Pandharpur',
    address1: 'GOPALPUR -RANJANI ROAD GOPALPUR, P.B. NO. 54',
    address2: '',
    address3: '',
    startYear: '1998',
    country: 'INDIA',
    state: 'MAHARASHTRA',
    district: 'SOLAPUR',
    tehsil: 'PANDHARPUR',
    pincode: '413304',
    contact: '9503103737, 020-12345678',
  }
];

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/settings/institute/list',
    method: 'GET',
    body({ body }) {
      return {
        code: 200,
        data: {
          total: data.length,
          records: data,
        }
      };
    },
  },
  {
    url: '/:api?/:tenant?/v1/settings/institute/get/:id?',
    method: 'GET',
    body({ body }) {
      return {
        code: 200,
        data: data[0]
      };
    },
  },
] as MockOptions;

export default defineMock(mockMethods);
