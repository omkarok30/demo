import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const data = [
  {
    "id": 1,
    "empId": "1",
    "academicYear": "2019-2020",
    "achievement": "Engineering ACHIEVEMENT award",
    "details": "RECEIVED Engineering ACHIEVEMENT award froM I",
    "document": "6712",
  },
  {
    "id": 2,
    "empId": "2",
    "academicYear": "2020-2021",
    "achievement": "Best paper award",
    "details": "National Conference On Advances In Electronic",
    "document": "6744",
  }
];
const mockMethods = [
  {
    url: "/:api?/:tenant?/v1/employee/employee_achievement/list",
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
    url: "/:api?/:tenant?/v1/employee/employee_achievement/get/:id?",
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
