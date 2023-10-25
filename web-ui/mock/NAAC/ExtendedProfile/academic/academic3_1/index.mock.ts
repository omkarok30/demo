import { MockOptions, defineMock } from 'vite-plugin-mock-dev-server';

const data = [
  {
    "id": 1,
    "academicYear": 2021,
    "employeeInfo$count": "20",
  },
  {
    "id": 2,
    "academicYear": 2022,
    "employeeInfo$count": "30",
  },
]
const academicData = [
  {
    "id": 1,
    "academicYear": 2022,
    "degreeProgramme$id": "1",
    "employeeInfo$aadhar": "6721218122112",
    "employeeInfo$email": "snehal@rsense.in",
    "employeeInfo$gender": "female",
    "employeeInfo$designation": "adjunct_professor",
    "employeeInfo$firstName": "Snehal",
    "employeeInfo$middleName": "pandurang",
    "employeeInfo$lastName": "shinde",
    "employeeInfo&dateOfJoining": '12-08-2016'
  },
  {
    "id": 2,
    "academicYear": 2021,
    "employeeInfo$aadhar": "2378732923832",
    "employeeInfo$email": "trupti@rsense.in",
    "employeeInfo$gender": "female",
    "employeeInfo$designation": "adjunct_professor",
    "employeeInfo$firstName": "Trupti",
    "employeeInfo$middleName": "Parmeshwar",
    "employeeInfo$lastName": "Chavan",
    "employeeInfo&dateOfJoining": '12-08-2016'
  },
]

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/NAAC/extendedFile/Academic/FullTimeTeachers/list/:year',
    method: 'GET',
    body({ params }) {
      const result = data.filter((list: any) => {
        return list.academicYear <= Number(params.year)
      });
      return {
        code: 200,
        data: {
          total: result.length,
          records: result,
        },
      };
    },
  },
  {
    url: '/:api?/:tenant?/v1/NAAC/extendedFile/Academic/FullTimeTeachers/get/:year',
    method: 'GET',
    body({ params }) {
      const result = academicData.filter((list: any) => list.academicYear === Number(params.year));
      return {
        code: 200,
        data: {
          total: result.length,
          records: result,
        },
      };
    },
  },

] as MockOptions;

export default defineMock(mockMethods);