import { MockOptions, defineMock } from 'vite-plugin-mock-dev-server';

const data = [
  {
    "id": 1,
    "courseFacultyLinking$academicYear": 2021,
    "courseFacultyLinking$count": "10",
  },
  {
    "id": 1,
    "courseFacultyLinking$academicYear": 2022,
    "courseFacultyLinking$count": "9",
  },
  {
    "id": 1,
    "courseFacultyLinking$academicYear": 2023,
    "courseFacultyLinking$count": "5",
  },
]
const programData = [
  {
    "id": 1,
    "courseFacultyLinking$academicYear": 2021,
    "courseFacultyLinking$id": "1",
    "courseFacultyLinking$programId": "1",
    "courseFacultyLinking$programCode": "1AS1",
    "courses$code": "bet",
    "courses$name": "basic electonics",
    "courses$introductionYear": 2020

  },
  {
    "id": 2,
    "courseFacultyLinking$academicYear": 2022,
    "courseFacultyLinking$id": "1",
    "courseFacultyLinking$programId": "1",
    "courseFacultyLinking$programCode": "1AS1",
    "courses$code": "CH",
    "courses$name": "Engineering Chemistry",
    "courses$introductionYear": 2020
  },
]

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/NAAC/extendedFile/program/course/list/:year',
    method: 'GET',
    body({ params }) {
      const result = data.filter((list: any) => {
        return list.courseFacultyLinking$academicYear <= Number(params.year)
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
    url: '/:api?/:tenant?/v1/NAAC/extendedFile/program/course/get/:year',
    method: 'GET',
    body({ params }) {
      const result = programData.filter((list: any) => list.courseFacultyLinking$academicYear === Number(params.year));
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