import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/settings/term_duration/list',
    method: 'GET',
    body({ body }) {
      return {
        code: 200,
        data: [
          {
            "key": 1,
            "id": 1,
            "degreelevel": "UG",
            "year": "2022-23",
            "pattern": "Semester 1",
            "fromdate": "2022-01-01",
            "todate": "2022-05-30",
            "reexam": "YES"

          },
          {
            "key": 2,
            "id": 2,
            "degreelevel": "UG",
            "year": "2022-23",
            "pattern": "Semester 2",
            "fromdate": "2022-06-15",
            "todate": "2022-12-30",
            "reexam": "NO"
          },
          {
            "key": 3,
            "id": 3,
            "degreelevel": "UG",
            "year": "2021-22",
            "pattern": "Semester 1",
            "fromdate": "2021-01-01",
            "todate": "2021-06-30",
            "reexam": "YES"
          },
          {
            "key": 4,
            "id": 4,
            "degreelevel": "UG",
            "year": "2021-22",
            "pattern": "Semester 2",
            "fromdate": "2021-06-15",
            "todate": "2021-12-30",
            "reexam": "NO"
          }
        ],
      };
    },
  },
] as MockOptions;

export default defineMock(mockMethods);
