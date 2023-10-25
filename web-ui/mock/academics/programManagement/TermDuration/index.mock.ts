import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';
import _ from 'lodash';
import { size } from 'lodash';


const data = [
  {
    id: "1",
    year: 2020,
    programId: "4",
    className: "first",
    term: "annual",
    semester: [{key:1,startDate:'2020-05-21',endDate:'2020-10-21'}],
  },
  {
    id: "2",
    year: 2020,
    programId: "1",
    className: "first",
    term: "semester",
    semester: [{key:1,startDate:'2021-05-21',endDate:'2021-10-21'},{key:2,startDate:'2021-11-21',endDate:'2022-03-15'},],
  },
  {
    id: "3",
    year: 2020,
    programId: "1",
    className: "second",
    term: "semester",
    semester: [{key:1,startDate:'2020-05-21',endDate:'2020-10-21'},{key:2,startDate:'2020-11-21',endDate:'2021-03-10'},],
  },
  {
    id: "4",
    year: 2020,
    programId: "3",
    className: "first",
    term: "annual",
    semester: [{key:1,startDate:'2020-05-21',endDate:'2020-10-21'}],
  },
  {
    id: "5",
    year: 2020,
    programId: "5",
    className: "first",
    term: "trimester",
    semester: [{key:1,startDate:'2020-05-21',endDate:'2020-10-21'},{key:2,startDate:'2020-11-21',endDate:'2021-03-10'},{key:1,startDate:'2020-05-21',endDate:'2020-10-21'},],
  },
];
const mockMethods = [
    {
      url: '/:api?/:tenant?/v1/academics/program-management/term-duration/list',
      method: 'GET',
      body() {
        return {
          code: 200,
          data: {
            total: data.length,
            records: data,
          }
        };
      },
    },
    {
      url: '/:api?/:tenant?/v1/academics/program-management/term-duration/get/:id?',
      method: 'GET',
      body({ params }) {
        const rec = _.find(data, { id: params.id });
        return {
          code: 200,
          data: {
            total: size(rec),
            records: rec,
          },
        };
      },
    },
  ] as MockOptions;
  
  export default defineMock(mockMethods);
  
