import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';
import _ from 'lodash';
import { size } from 'lodash';

const data = [
  {
    id: 1,
    studId: 1,
    courseId: 1,
    departmentId: 2,
    academicYear: 2020,
    term: 1,
    division: '1',
    programId: 2,
    className: 'second',
    degreeLevel: 'ug',
    status: 'active',
    linkToDocument: '',
    document: '',
    studentInfo$scholarNumber: 'ISE-2',
    studentInfo$enrolmentNumber: 'internal',
    studentInfo$firstName: 'Nithin',
    studentInfo$lastName: 'Singh',
    studentInfo$middleName: 'Mukul',
    divisions$division: 'b',
  },
  {
    id: 2,
    studId: 1,
    courseId: 2,
    departmentId: 2,
    academicYear: 2020,
    term: 1,
    division: '1',
    programId: 2,
    className: 'second',
    degreeLevel: 'ug',
    status: 'active',
    linkToDocument: '',
    document: '',
    studentInfo$scholarNumber: 'ISE-2',
    studentInfo$enrolmentNumber: 'internal',
    studentInfo$firstName: 'Pramod',
    studentInfo$lastName: 'Kumar',
    studentInfo$middleName: 'Devaraj',
    divisions$division: 'b',
  },
  {
    id: 3,
    studId: 3,
    courseId: 1,
    departmentId: 2,
    academicYear: 2020,
    term: 1,
    division: '1',
    programId: 2,
    className: 'second',
    degreeLevel: 'ug',
    status: 'active',
    linkToDocument: '',
    document: '',
    studentInfo$scholarNumber: 'ISE-2',
    studentInfo$enrolmentNumber: 'internal',
    studentInfo$firstName: 'Raju',
    studentInfo$lastName: 'Kumar',
    studentInfo$middleName: 'Siddharth',
    divisions$division: 'internal',
  },
];

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/academics/student_enrollment/student_course_enrollment/list/:year?/:program?/:class?/:semester?/:division?',
    method: 'GET',
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
    url: '/:api?/:tenant?/v1/academics/student_enrollment/student_course_enrollment/assignStudentEnrollment/add/',
    method: 'GET',
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
