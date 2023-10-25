import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';
import _ from 'lodash';
import { size } from 'lodash';

const data = [
  {
    "id": 1,
    "filedescription": "abc",
    "linkdocument": "",
    "uploadPath": "REPORT (1).XLSX",
    "introductionyear": 2021,
    "level": "file_description",
    "hardcode": "false",
    "rownumber": "",
    "criteriaNumber": '1.1.1'
  },
  {
    "id": 2,
    "filedescription": "ahbs",
    "linkdocument": "google.com",
    "uploadPath": "REPORT (1).XLSX",
    "introductionyear": 2022,
    "level": "additional_information",
    "hardcode": "true",
    "rownumber": 1,
    "criteriaNumber": '1.1.1'
  },
  {
    "id": 3,
    "filedescription": "abcd *At least 100 characte*At least 100 char",
    "linkdocument": "google.com",
    "uploadPath": "",
    "introductionyear": 2021,
    "level": "file_description",
    "hardcode": "false",
    "rownumber": "",
    "criteriaNumber": '1.1.1'
  }
];

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/naac/aqar/fileDescription/list/:criteria',
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
    url: '/:api?/:tenant?/v1/naac/aqar/fileDescription/get/:id?',
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
  {
    url: '/:api?/:tenant?/v1/naac/aqar/fileDescription/delete/:id?',
    method: 'POST',
    body({ params }) {
      const rec = data.filter((item) => item.id !== Number(params.id));
      return {
        code: 200,
        data: {
          total: size(rec),
          records: rec,
        },
      };
    },
  },
  {
    url: '/:api?/:tenant?/v1/naac/aqar/fileDescription/link/delete/:id?',
    method: 'POST',
    body({ params }) {
      const rec = data.filter((item) => item.id !== Number(params.id));
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

