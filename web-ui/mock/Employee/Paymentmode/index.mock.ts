import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';
import _ from 'lodash';
import { size } from 'lodash';

const data = [
  {
    id: "1",
    empId: "1",
    paymentMode: "bank",
    bankName: "1",
    accountNumber: "100039132661",
    accountType: "savings",
    IFSC: "INDB0000892",
  },
  {
    id: "2",
    empId: "2",
    paymentMode: "cheque",
    bankName: "1",
    accountNumber: "159881034847",
    accountType: "current",
    IFSC: "INDB0000893",
  },
  {
    id: "3",
    empId: "3",
    paymentMode: "cash",
    bankName: "2",
    accountNumber: "100039131404",
    accountType: "current",
    IFSC: "indb0000892",
  },
];

const mockMethods = [
    {
      url: '/:api?/:tenant?/v1/employee/paymentmode/list',
      method: 'GET',
      body() {
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
      url: '/:api?/:tenant?/v1/employeerecord/paymentmode/get/:id?',
      method: 'GET',
      body({ params }) {
        const rec = _.find(data, { id: params.id });
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
