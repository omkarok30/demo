import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const data = [
  {
    id: "1",
    department: "FIRST YEAR DEPARTMENT",
    departmentCode: "FY",
    teachingStaff: "19",
    nonteachingStaff: "1",
    total: "20",
    inactive: false,
  },
  {
    id: "2",
    department: "CIVIL ENGINEERING",
    departmentCode: "CE",
    teachingStaff: "19",
    nonteachingStaff: "1",
    total: "20",
    inactive: false,
  },
  {
    id: "3",
    department: "COMPUTER SCIENCE AND ENGINEERING",
    departmentCode: "CS",
    teachingStaff: "19",
    nonteachingStaff: "1",
    total: "20",
    inactive: false,
  },
  {
    id: "4",
    department: "MECHANICAL ENGINEERING",
    departmentCode: "internal",
    teachingStaff: "19",
    nonteachingStaff: "1",
    total: "20",
    inactive: false,
  },
];

const mockMethods = [
  {
    url: "/:api?/:tenant?/v1/employee/employeedashboard/academicsyearwise/list",
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
    url: "/:api?/:tenant?/v1/employee/employeedashboard/academicsyearwise/get/:id?",
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
