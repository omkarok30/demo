import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";


const data = [
    {
        "id": 1,
        "empId": 1,
        "organization": "Accolade Electronics pvt ltd. pune",
        "joiningDate": "2009-10-22",
        "leavingDate": "2011-06-22",
        "typeOfExperience": "ENTREPRENUERSHIP",
        "joiningDesignation": " production testing engineer",
        "leavingDesignation": "SENIOR PRODUCTION TESTING ENGINEER",
        "salary": 25000,
        "achievments": "",
        "experienceDocument": "",
        "releavingDocument": ""
    },
    {
        "id": 2,
        "empId": 2,
        "organization": "Accolade Electronics pvt ltd. pune",
        "joiningDate": "2009-10-22",
        "leavingDate": "2011-06-22",
        "typeOfExperience": "INDUSTRY",
        "joiningDesignation": " production testing engineer",
        "leavingDesignation": "SENIOR PRODUCTION TESTING ENGINEER",
        "salary": 25000,
        "achievments": "",
        "experienceDocument": "",
        "releavingDocument": ""
    }
];

const mockMethods = [
  {
    url: "/:api?/:tenant?/v1/employee/employee_experience/list",
    method: "GET",
    body() {
      return {
        code: 200,
        data: {
          total: data.length,
          records: data,
        },
      };
    },
  },
  {
    url: "/:api?/:tenant?/v1/employee/employee_experience/get/:id?",
    method: "GET",
    body({ params }) {
      const rec = _.find(data, { id: params.id });
      return {
        code: 200,
        data: {
          total: size(rec),
          records: data[0],
        },
      };
    },
  },
] as MockOptions;

export default defineMock(mockMethods);
