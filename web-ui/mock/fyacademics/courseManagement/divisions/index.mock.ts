import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const data = [
  {
    id: 1,
    degreeLevel: "UG",
    departmentId: "1",
    programId: "",
    academicYear: 2020,
    className: "first",
    division: "a",
    noFurtherChanges: "false",
    isFy: "true",
  },
  {
    id: 2,
    degreeLevel: "UG",
    departmentId: "1",
    programId: "",
    academicYear: 2020,
    className: "first",
    division: "b",
    noFurtherChanges: "false",
    isFy: "true",
  },
  {
    id: 3,
    degreeLevel: "UG",
    departmentId: "1",
    programId: "",
    academicYear: 2021,
    className: "first",
    division: "a",
    noFurtherChanges: "false",
    isFy: "true",
  },
  {
    id: 4,
    degreeLevel: "UG",
    departmentId: "1",
    programId: "",
    academicYear: 2021,
    className: "first",
    division: "b",
    noFurtherChanges: "false",
    isFy: "true",
  },
  {
    id: 5,
    degreeLevel: "UG",
    departmentId: "1",
    programId: "",
    academicYear: 2021,
    className: "first",
    division: "c",
    noFurtherChanges: "false",
    isFy: "true",
  },
  {
    id: 5,
    degreeLevel: "UG",
    departmentId: "1",
    programId: "",
    academicYear: 2022,
    className: "first",
    division: "b",
    noFurtherChanges: "false",
    isFy: "true",
  },
];

const mockMethods = [
  {
    url: "/:api?/:tenant?/v1/fyacademics/divisions/list",
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
    url: "/:api?/:tenant?/v1/fyacademics/divisions/get/:id?",
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
