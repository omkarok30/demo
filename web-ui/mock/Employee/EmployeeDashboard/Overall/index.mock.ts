import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const data = [
  {
    id: "1",
    teachingStaff: "19",
    nonteachingStaff: "1",
    total: "",

  },
  {
    id: "2",
    teachingStaff: "19",
    nonteachingStaff: "1",
    total: "",
   
  },
  {
    id: "3",
    teachingStaff: "19",
    nonteachingStaff: "1",
    total: "true",
   
  },
  {
    id: "4",
    teachingStaff: "19",
    nonteachingStaff: "question_wise",
    total: "true",

  },
];

const mockMethods = [
  {
    url: "/:api?/:tenant?/v1/employee/employeedashboard/overall/list",
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
    url: "/:api?/:tenant?/v1/employee/employeedashboard/overall/get/:id?",
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
