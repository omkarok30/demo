import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const responseData = [
  {
    id: "1",
    bankName: "STATE BANK OF INDIA",
    branchName: "Pune",
    ifscCode: "SBIN0000001",
    accountNumber: "12345678901",
    branchAddress: "ShivajiNagar",
    linkToSalary: true,
  },
  {
    id: "2",
    bankName: "HDFC",
    branchName: "PUNE",
    ifscCode: "HDFC0000001",
    accountNumber: "12345678902",
    branchAddress: "Hadapsar",
    linkToSalary: true,
  },
  {
    id: "3",
    bankName: "ICICI",
    branchName: "MUMBAI",
    ifscCode: "ICIC0000446",
    accountNumber: "12345678903",
    branchAddress: "Yarawada",
    linkToSalary: false,
  },
];

const mockMethods = [
  {
    url: "/:api?/:tenant?/v1/admissions/student_record/banking-details/list",
    method: "GET",
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
    url: "/:api?/:tenant?/v1/admissions/student_record/banking-details/get/:id?",
    method: "GET",
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
