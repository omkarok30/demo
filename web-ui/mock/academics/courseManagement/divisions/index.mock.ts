import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const data = [
  {
    id: '1',
    degreeLevel: "UG",
    departmentId: "2",
    programId: "2",
    academicYear: 2020,
    className: "second",
    division: "a",
    noFurtherChanges: "false",
    isFy: "false",
  },
  {

    id: '2',
    degreeLevel: "UG",
    departmentId: "2",
    programId: "2",
    academicYear: 2020,
    className: "second",
    division: "b",
    noFurtherChanges: "false",
    isFy: "false",
  },
  {

    id: '3',
    degreeLevel: "UG",
    departmentId: "2",
    programId: "2",
    academicYear: 2021,
    className: "second",
    division: "a",
    noFurtherChanges: "false",
    isFy: "false",
  },
  {
    id: '4',
    degreeLevel: "UG",
    departmentId: "2",
    programId: "2",
    academicYear: 2021,
    className: "second",
    division: "b",
    noFurtherChanges: "false",
    isFy: "false",
  },
  {
    id: '5',
    degreeLevel: "UG",
    departmentId: "2",
    programId: "2",
    academicYear: 2021,
    className: "third",
    division: "a",
    noFurtherChanges: "false",
    isFy: "false",
  },
  {
    id: '6',
    degreeLevel: "UG",
    departmentId: "2",
    programId: "2",
    academicYear: 2022,
    className: "second",
    division: "a",
    noFurtherChanges: "false",
    isFy: "false",
  },
  {
    id: "7",
    degreeLevel: "UG",
    departmentId: "2",
    programId: "2",
    academicYear: 2022,
    className: "second",
    division: "b",
    noFurtherChanges: "false",
    isFy: "true",
  },
];

const mockMethods = [
  {
    url: "/:api?/:tenant?/v1/academics/divisions/list",
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
    url: "/:api?/:tenant?/v1/academics/divisions/get/:id?",
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
  {
    url: "/:api?/:tenant?/v1/academics/listClassWise/:year?/:program?/:class?",
    method: "GET",
    body({ params }) {
      const rec = _.find(data, { id: params.year });
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
