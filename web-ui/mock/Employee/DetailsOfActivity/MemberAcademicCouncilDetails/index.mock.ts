import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const data = [
  {
    "id": "1",
    "empId": 1,
    "nameOfCommittee": "BOS member for electronics and telecommunicat",
    "fromDate": "2020-10-29",
    "toDate": "2022-10-28",
    "certificateDocument": "5090",
    "designation": "BOS MEMBER"
  },
  {
    "id": "2",
    "empId": 1,
    "nameOfCommittee": "yuva incubated",
    "fromDate": "2020-06-26",
    "toDate": "2022-01-01",
    "certificateDocument": "5654",
    "designation": "ADVISORY board MEMBERSHIP"
  },
  {
    "id": "3",
    "empId": 2,
    "nameOfCommittee": "The all India society for technical education",
    "fromDate": "2013-01-01",
    "toDate": "2021-08-31",
    "certificateDocument": "6603",
    "designation": "life member"
  }
];

const mockMethods = [
  {
    url: "/:api?/:tenant?/v1/employee/employee_member_academic_council_details/list",
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
    url: "/:api?/:tenant?/v1/employee/employee_member_academic_council_details/get/:id?",
    method: "GET",
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
