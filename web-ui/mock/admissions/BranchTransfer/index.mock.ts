import _ from 'lodash';
import { MockMethod } from 'vite-plugin-mock';

const branchTransferedStudents = [
  {
    studentId: '1',
    student_info$registrationYear: 2021,
    student_info$firstName:"SNEHAL",
    student_info$middleName:"PANDURANG",
    student_info$lastName:"SHINDE",
    student_info$scholarNumber: '201CE11029',
    previousStudentCode: '131ET11002',
    previousProgramId: 1,
    programId: 4,
    transferDate: '2021-09-30',
    status: 'approved',
  },

  
];

const students = [
  {
    studentName: 'SANGITA SHIVAJI DESHMUKH',
    registrationYear: 2022,
    studentId: '2',
  },
  {
    studentName: 'TRUPTI PARMESHWAR CHAVAN',
    registrationYear: 2021,
    studentId: '3',
  },

];

export default [
  {
    url: '/:api?/:tenant?/v1/admissions/branch-transfer/list',
    method: 'GET',
    body() {
      return {
        code: 200,
        data: {
          total: branchTransferedStudents.length,
          records: branchTransferedStudents,
          students: students,
        },
      };
    },
  },
  {
    url: '/:api?/:tenant?/v1/admissions/branch-transfer/get/:id?',
    method: 'GET',
    body({ params }) {
      const rec = _.find(branchTransferedStudents, { studentId: params.id });
      return {
        code: 200,
        data: {
          record: rec,
        },
      };
    },
  },
] as MockMethod[];
