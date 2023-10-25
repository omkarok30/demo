import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const data = [
  {
    id: "1",
    department: "FIRST YEAR DEPARTMENT",
    departmentCode: "FY",

    nonteachingStaff: "1",
    total: "20",
  },
  {
    id: "2",
    department: "CIVIL ENGINEERING",
    departmentCode: "CE",

    nonteachingStaff: "1",
    total: "20",
  },
  {
    id: "3",
    department: "COMPUTER SCIENCE AND ENGINEERING",
    departmentCode: "CS",

    nonteachingStaff: "1",
    total: "20",
  },
  {
    id: "4",
    department: "MECHANICAL ENGINEERING",
    departmentCode: "internal",

    nonteachingStaff: "1",
    total: "20",
  },
];

const mockMethods = [
  {
    url: "/:api?/:tenant?/v1/employee/employeedashboard/administrativedept/list",
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
    url: "/:api?/:tenant?/v1/employee/employeedashboard/administrativedept/get/:id?",
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
