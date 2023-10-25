import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const data = [
  {
    id: 1,
    studId: 1,
    division: 1,
    academicYear: 2020,
    className: "second",
    semester: 1,
    isActive: true,
    programId: 2,
    isTransfered: false,
    transferDate: null,
    isDivisionActive: true,
    // sequenceofstud: 0,
    // isreorderdone: false,
    studentInfo$scholarNumber: "ISE-2",
    studentInfo$enrolmentNumber: "internal",
    studentInfo$firstName: "Nithin",
    studentInfo$lastName: "Singh",
    studentInfo$middleName: "Mukul",
    divisions$division: "b",
  },
  {
    id: 2,
    studId: 8620,
    division: 2,
    academicYear: "2020",
    className: "second",
    semester: 1,
    isActive: true,
    programId: 2,
    isTransfered: false,
    transferDate: null,
    isDivisionActive: true,
    // sequenceofstud: 0,
    // isreorderdone: false,
    studentInfo$scholarNumber: "ISE-2",
    studentInfo$enrolmentNumber: "internal",
    studentInfo$firstName: "Pramod",
    studentInfo$lastName: "Kumar",
    studentInfo$middleName: "Devaraj",
    divisions$division: "b",
  },
  {
    id: 3,
    studId: 3,
    division: 1,
    academicYear: "2020",
    className: "second",
    semester: 1,
    isActive: true,
    programId: 0,
    isTransfered: false,
    transferDate: null,
    isDivisionActive: true,
    // sequenceofstud: 0,
    // isreorderdone: false,
    studentInfo$scholarNumber: "ISE-2",
    studentInfo$enrolmentNumber: "internal",
    studentInfo$firstName: "Raju",
    studentInfo$lastName: "Kumar",
    studentInfo$middleName: "Siddharth",
    divisions$division: "internal",
  },
];

const mockMethods = [
  {
    url: "/:api?/:tenant?/v1/academics/student_enrollment/student_division_enrollment/assignStudentEnrollment/list/:year?/:program?/:class?/:semester?/:division?",
    method: "GET",
    body({ params }) {
      // const rec = _.find(data, { id: params.year });
      return {
        code: 200,
        data: {
          total: size(data),
          records: data,
        },
      };
    },
  },
  {
    url: "/:api?/:tenant?/v1/academics/student_enrollment/student_division_enrollment/assignStudentEnrollment/add/",
    method: "GET",
    body({ params }) {
      return {
        code: 200,
        data: {
          total: size(data),
          records: data,
        },
      };
    },
  },
] as MockOptions;

export default defineMock(mockMethods);
