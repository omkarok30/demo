import { MockOptions, defineMock } from 'vite-plugin-mock-dev-server';

const data = [
  {
    "id": 1,
    "academicYear": 2021,
    "studentPromotionMap$count": "10",

  },
  {
    "id": 2,
    "academicYear": 2022,
    "studentPromotionMap$count": "5",
  },
  {
    "id": 3,
    "academicYear": 2020,
    "studentPromotionMap$count": "9",
  }
]
const studentsData = [
  {
    "id": 1,
    "academicYear": 2021,
    "studentInfo$enrolmentNumber": "2020032500186212",
    "studentInfo$firstName": "Snehal",
    "studentInfor$middleName": "pandurang",
    "studentInfo$lastName": "shinde",
    "studentPromotionMap$admissionDate": "2021-06-10",
  },
  {
    "id": 1,
    "academicYear": 2022,
    "studentInfo$enrolmentNumber": "2020032500186185",
    "studentInfo$firstName": "Trupti",
    "studentInfor$middleName": "Parmeshwar",
    "studentInfo$lastName": "Chavan",
    "studentPromotionMap$admissionDate": "2021-06-10",
  }
]

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/NAAC/extendedFile/student/ExtendedStud/list/:year',
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
    url: '/:api?/:tenant?/v1/NAAC/extendedFile/student/ExtendedStud/get/:year',
    method: 'GET',
    body({ params }) {
      const result = studentsData.filter((list: any) => list.academicYear === Number(params.year));
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