import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';
import _ from 'lodash';

const data = [
  {
    id: "1",
    yearAt: "2020",
    year: "2020-21",
    ugFromDate: "",
    ugToDate: "",
    isActive: "false",
    isActivated: "false",
    commencementYear: "false",
    pgFromDate: "",
    pgToDate: "",
    phdFromDate: "",
    phdToDate: "",
    diplomaFromDate: "",
    diplomaToDate: "",
    assessmentType: "",
    fyDeptType: "",
  },
  {
    id: "2",
    yearAt: "2021",
    year: "2021-22",
    ugFromDate: "2021-05-21",
    ugToDate: "",
    isActive: "true",
    isActivated: "false",
    commencementYear: "false",
    pgFromDate: "",
    pgToDate: "",
    phdFromDate: "",
    phdToDate: "",
    diplomaFromDate: "",
    diplomaToDate: "",
    assessmentType: "",
    fyDeptType: "typea",
  },
  {
    id: "3",
    yearAt: "2022",
    year: "2022-23",
    ugFromDate: "2022-04-21",
    ugToDate: "",
    isActive: "false",
    isActivated: "false",
    commencementYear: "false",
    pgFromDate: "",
    pgToDate: "",
    phdFromDate: "",
    phdToDate: "",
    diplomaFromDate: "",
    diplomaToDate: "",
    assessmentType: "",
    fyDeptType: "typeb",
  },
];

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/settings/academic_year/list',
    method: 'GET',
    body({ body }) {
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
    url: '/:api?/:tenant?/v1/settings/academic_year/get/:id?',
    method: 'GET',
    body({ params }) {
      const obj = _.find(data, { id: params.id });
      return {
        code: 200,
        data: obj
      };
    },
  },
] as MockOptions;

export default defineMock(mockMethods);
