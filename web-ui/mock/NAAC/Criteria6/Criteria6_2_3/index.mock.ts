import _ from 'lodash';
import { MockOptions, defineMock } from 'vite-plugin-mock-dev-server';

const areaStudentData = [
  {
    "id": 1,
    "academicYear": 2020,
    "areasName": "Administration",
    "implementationYear": "2020-21",
    "areasValue": "administration",
    "venderName": "trupti"
  },
  {
    "id": 2,
    "academicYear": 2020,
    "areasName": "Finance And Accounts",
    "implementationYear": "2020-21",
    "areasValue": "finance",
    "venderName": "trupti",
  },
  {
    "id": 3,
    "academicYear": 2020,
    "areasName": "STUDENT ADMISSION AND SUPPORT	",
    "implementationYear": "2020-21",
    "areasValue": "studentadmission",
    "venderName": "trupti"
  },
  {
    "id": 4,
    "academicYear": 2020,
    "areasName": "EXAMINATION",
    "implementationYear": "2020-21",
    "areasValue": "examination",
    "venderName": "sdhjkmls "
  },
]

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/NAAC/criteria6/6.2.3/getArea/:year',
    method: 'GET',
    body(req) {
      const params = req.params
      const result = areaStudentData.filter((list) => list.academicYear === Number(params.year));
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
