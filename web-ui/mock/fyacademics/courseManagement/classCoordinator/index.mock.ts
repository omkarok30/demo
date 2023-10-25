import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const data = [
  {
    id: "1",
    degreeLevel: "UG",
    programmeNameId: "0",
    className: "first",
    academicYear: 2021,
    division: "1",
    semester: "2",
    userId: "1",
    departmentId: "1",
    isFY: "true",
    divisions$division: "a",
    employee_info$firstName:"Trupti",
    employee_info$middleName:"Lakshman",
    employee_info$lastName:"Doke",
  },
  {
    id: "2",
    degreeLevel: "UG",
    programmeNameId: "0",
    className: "first",
    academicYear: 2020,
    division: "1",
    semester: "2",
    userId: "2",
    departmentId: "1",
    isFY: "true",
    divisions$division: "a",
    employee_info$firstName:"puja",
    employee_info$middleName:"lakshman",
    employee_info$lastName:"chavan",
  },
  {
    id: "3",
    degreeLevel: "UG",
    programmeNameId: "0",
    className: "first",
    academicYear: 2022,
    division: "1",
    semester: "2",
    userId: null,
    departmentId: "1",
    isFY: "true",
    divisions$division: "a",
    employee_info$firstName:"",
    employee_info$middleName:"",
    employee_info$lastName:"",
  },
  {
    id: "4",
    degreeLevel: "UG",
    programmeNameId: "0",
    className: "first",
    academicYear: 2022,
    division: "1",
    semester: "1",
    userId: null,
    departmentId: "1",
    isFY: "true",
    divisions$division: "b",
    employee_info$firstName:"",
    employee_info$middleName:"",
    employee_info$lastName:"",
  },
];
const mockMethods = [
  {
    url: "/:api?/:tenant?/v1/FYAcademics/CourseManage/ClassCoordinate/list",
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
    url: "/:api?/:tenant?/v1/FYAcademics/CourseManage/ClassCoordinate/get/:id?",
    method: "GET",
    body({ query }) {
      const rec = _.find(data, { id: query.id });
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
