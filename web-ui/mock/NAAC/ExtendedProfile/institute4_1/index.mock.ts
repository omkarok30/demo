import { MockOptions, defineMock } from 'vite-plugin-mock-dev-server';

const data = [
  {
    "id": 1,
    "academicYear": 2021,
    "type": "classrooms",
    "number": "10",
  },
  {
    "id": 2,
    "academicYear": 2020,
    "type": "classrooms",
    "number": "15",
  },
  {
    "id": 3,
    "academicYear": 2021,
    "type": "salary",
    "number": "15",
  },
  {
    "id": 4,
    "academicYear": 2022,
    "type": "salary",
    "number": "50",
  },
  {
    "id": 5,
    "academicYear": 2020,
    "type": "salary",
    "number": "0",
  },
  {
    "id": 6,
    "academicYear": 2020,
    "type": "computers",
    "number": "20",
  }
]

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/NAAC/extendedFile/Institution/list/:year',
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
] as MockOptions;

export default defineMock(mockMethods);