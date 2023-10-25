import { MockOptions, defineMock } from 'vite-plugin-mock-dev-server';

const data = [

  {
    "id": 1,
    "academicYear": 2021,
    "degreeProgramme$count": "10",
  },
  {
    "id": 1,
    "academicYear": 2022,
    "degreeProgramme$count": "9",
  },
  {
    "id": 1,
    "academicYear": 2023,
    "degreeProgramme$count": "5",
  },
]

const programData = [

  {
    "id": 1,
    "academicYear": 2022,
    "degreeProgramme$programmeName": "UG in civil engineering",
    "degreeProgramme$programCode": "1CE1",
    "degreeProgramme$startYear": "2020",
  },
  {
    "id": 2,
    "academicYear": 2021,
    "degreeProgramme$programmeName": "UG in Computer engineering",
    "degreeProgramme$programCode": "1Co1",
    "degreeProgramme$startYear": "2019",
  },
  {
    "id": 3,
    "academicYear": 2021,
    "degreeProgramme$programmeName": "UG in Computer engineering",
    "degreeProgramme$programCode": "1Co1",
    "degreeProgramme$startYear": "2019",
  },
]

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/NAAC/extendedFile/program/list/:year',
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
    url: '/:api?/:tenant?/v1/NAAC/extendedFile/program/get/:year',
    method: 'GET',
    body({ params }) {
      const result = programData.filter((list: any) => list.academicYear === Number(params.year));
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