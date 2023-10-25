import _ from 'lodash';
import { MockOptions, defineMock } from 'vite-plugin-mock-dev-server';

const data = [
  {
    id: 1,
    academicYear: 2022,
    options: 'B',
    criteriaNumber: '5.1.3',
  },
  {
    id: 2,
    academicYear: 2021,
    options: 'A',
    criteriaNumber: '5.1.5',
  },
  {
    id: 3,
    academicYear: 2021,
    options: 'B',
    criteriaNumber: '6.2.3',
  },
  {
    id: 4,
    academicYear: 2021,
    options: 'D',
    criteriaNumber: '6.5.3',
  },
  {
    id: 5,
    academicYear: 2022,
    options: 'C',
    criteriaNumber: '7.1.2',
  },
  {
    id: 6,
    academicYear: 2021,
    options: 'E',
    criteriaNumber: '7.1.4',
  },
  {
    id: 7,
    academicYear: 2021,
    options: 'A',
    criteriaNumber: '7.1.5',
  },
  {
    id: 8,
    academicYear: 2022,
    options: 'B',
    criteriaNumber: '7.1.6',
  },
  {
    id: 9,
    academicYear: 2022,
    options: 'A',
    criteriaNumber: '7.1.7',
  },
  {
    id: 10,
    academicYear: 2022,
    options: 'E',
    criteriaNumber: '7.1.10',
  },
];

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/NAAC/radiaButton/list',
    method: 'GET',
    body() {
      return {
        code: 200,
        data: {
          total: data.length,
          records: data,
        },
      };
    },
  },
  {
    url: '/:api?/:tenant?/v1/NAAC/radiaButton/get/:year',
    method: 'GET',
    body({ params }) {
      const result = data.filter((item) => item.academicYear === Number(params.year));
      return {
        code: 200,
        data: {
          records: result,
        },
      };
    },
  },
  {
    url: '/:api?/:tenant?/v1/NAAC/radiaButton/edit/:year',
    method: 'POST',
    body(req) {
      const { option } = req.body;
      const params = req.params;
      const result = data.map(list => list.academicYear === params.year ? { ...list, options: option } : list);
      return {
        code: 200,
        data: {
          records: result,
        },
      };
    },
  },
] as MockOptions;

export default defineMock(mockMethods);
