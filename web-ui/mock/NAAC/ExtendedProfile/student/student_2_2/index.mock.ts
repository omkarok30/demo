import { MockOptions, defineMock } from 'vite-plugin-mock-dev-server';

const data = [
  {
    "id": 1,
    "academicYear": 2021,
    "category": "open",
    "numberOfSeats": 10
  },
  {
    "id": 2,
    "academicYear": 2020,
    "category": "open",
    "numberOfSeats": 19
  },
  {
    "id": 3,
    "academicYear": 2020,
    "category": "obc",
    "numberOfSeats": 13
  }
]

const linksData = [
  {
    "id": 1,
    "academicYear": 2021,
    "link": "google.co.in",
    "document": null
  },
  {
    "id": 15,
    "academicYear": 2020,
    "link": "www.gmail.com",
    "document": 'asd'
  },
  {
    "id": 16,
    "academicYear": 2022,
    "link": "www.gamil.com",
    "document": null
  }
]

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/NAAC/extendedFile/student/seats/list/:year',
    method: 'GET',
    body({ params }) {
      const result = data.filter((list: any) => {
        return list.academicYear <= Number(params.year)
      });
      const linksResult = linksData?.filter((list: any) => {
        return list.academicYear <= Number(params.year)
      });
      return {
        code: 200,
        data: {
          total: result.length,
          records: result,
          linksRecord: linksResult
        },
      };
    },
  },
  {
    url: '/:api?/:tenant?/v1/NAAC/extendedFile/student/seats/get/:year',
    method: 'GET',
    body({ params }) {
      const result = linksData.filter((list: any) => list.academicYear === Number(params.year));
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