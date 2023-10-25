import _ from 'lodash';
import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';

const data = [
  {
    "id": "1",
    "levelOfEducation": "Diploma",
    "departmentId": "2",
    "programType": "department",
    "programmeName": "Diploma in Civil Engineering",
    "degreeName": "Bachelor of Engineering",
    "facultyOfStudy": "Engineering",
    "affiliationType": "TIER II",
    "programCode": "CE2",
    "programDuration": "3",
    "examinationPattern": "semester",
    "startYear": "2021",
    "closeYear": "",
    "implOfCbcs": "yes",
    "yearOfImpl": "2020",
    "isFyApplicable": "false" ,//Changed
    "linkToDocument": "https://www.rwork.tech",

  },
  {
    "id": "2",
    "levelOfEducation": "Diploma",
    "programType": "department",
    "departmentId": "3",
    "programmeName": "Diploma in Computer Engineering",
    "degreeName": "Diploma  Engineering",
    "facultyOfStudy": "Engineering",
    "affiliationType": "TEIR II",
    "programCode": "CE1",
    "programDuration": "3",
    "examinationPattern": "semester",
    "startYear": "2009",
    "closeYear": "",
    "implOfCbcs": "yes",
    "yearOfImpl": "2020",
    "isFyApplicable": "false" ,//Changed
    "linkToDocument": "https://www.rwork.tech",
  },
  {
    "id": "3",
    "levelOfEducation": "UG",
    "programType": "department",
    "departmentId": "3",
    "programmeName": "ug in computer Engineering",
    "degreeName": "Bachelor of Engineering",
    "facultyOfStudy": "Engineering",
    "affiliationType": "TEIR II",
    "programCode": "EE1",
    "programDuration": "4",
    "examinationPattern": "trimester",
    "startYear": "2021",
    "closeYear": "",
    "implOfCbcs": "no",
    "yearOfImpl": null,
    "isFyApplicable": "true", //Changed
    "linkToDocument": "https://www.rwork.tech",
  },
  {
    "id": "4",
    "levelOfEducation": "Diploma",
    "departmentId": null,
    "programType": "institute",
    "programmeName": "Diploma in Pharmacy",
    "degreeName": "D. Pharm",
    "facultyOfStudy": "Pharmacy",
    "affiliationType": "TEIR II",
    "programCode": "PH1",
    "programDuration": "2",
    "examinationPattern": "annual",
    "startYear": "2020",
    "closeYear": "",
    "implOfCbcs": "no",
    "yearOfImpl": null,
    "linkToDocument": null,
    "isFyApplicable": "false" //Changed
  }
]
const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/settings/degree-programme/list',
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
    url: '/:api?/:tenant?/v1/settings/degree-programme/get/:id?',
    method: 'GET',
    body({ params }) {
      const rec = _.find(data, { id: params.id })
      return {
        code: 200,
        data: rec
      };
    },
  },
] as MockOptions;

export default defineMock(mockMethods);
