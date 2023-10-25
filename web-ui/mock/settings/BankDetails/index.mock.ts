import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';

const data = [
  {
    "id": "1",
    "bankName": "STATE BANK OF INDIA",
    "branchName": "PANDHARPUR",
    "ifscCode": "SBIN0000446",
    "accountNumber": "0000000000",
    "branchAddress": "PANDHARPUR",
    "linkToSalary": "YES"
  },
  {
    "id": "2",
    "bankName": "HDFC",
    "branchName": "PUNE",
    "ifscCode": "HDFC0000446",
    "accountNumber": "11111111111",
    "branchAddress": "PUNE",
    "linkToSalary": "YES"
  },
  {
    "id": "3",
    "bankName": "ICICI",
    "branchName": "MUMBAI",
    "ifscCode": "ICIC0000446",
    "accountNumber": "22222222222",
    "branchAddress": "MUMBAI",
    "linkToSalary": "NO"
  }
];

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/settings/bank_details/list',
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
    url: '/:api?/:tenant?/v1/settings/bank_details/get/:id?',
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
