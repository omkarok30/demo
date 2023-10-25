import { MockOptions, defineMock } from 'vite-plugin-mock-dev-server';

const data = [
  {
    "id": 1,
    "studentPromotionMap$academicYear": 2021,
    "studentPromotionMap$count": "10",
  },
  {
    "id": 2,
    "studentPromotionMap$academicYear": 2022,
    "studentPromotionMap$count": "15",
  },
]
const studentsData = [
  {
    "id": 1,
    "studentPromotionMap$academicYear": 2021,
    "studentInfo$enrolmentNumber": "2020032500186212",
    "studentInfo$firstName": "Snehal",
    "studentInfor$middleName": "pandurang",
    "studentInfo$lastName": "shinde",
  },
  {
    "id": 1,
    "studentPromotionMap$academicYear": 2021,
    "studentInfo$enrolmentNumber": "2020032500186185",
    "studentInfo$firstName": "Trupti",
    "studentInfor$middleName": "Parmeshwar",
    "studentInfo$lastName": "Chavan",
  },
]

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/NAAC/extendedFile/student/finalYear/list/:year',
    method: 'GET',
    body({ params }) {
      const result = data.filter((list: any) => {
        return list.studentPromotionMap$academicYear <= Number(params.year)
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
    url: '/:api?/:tenant?/v1/NAAC/extendedFile/student/finalYear/get/:year',
    method: 'GET',
    body({ params }) {
      const result = studentsData.filter((list: any) => list.studentPromotionMap$academicYear === Number(params.year));
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