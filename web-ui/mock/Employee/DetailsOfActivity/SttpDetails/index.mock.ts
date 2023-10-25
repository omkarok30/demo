import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const data = [
    {
        "id": "1",
        "empId": 1,
        "academicYear": "2021",
        "programDetails": "Budgeting and Scheduling Projects",
        "startDate": "2021-03-08",
        "endDate": "2021-04-06",
        "duration": 30,
        "location": "pandharpur online",
        "certificateDocument": "",
        "organisingBody": "other",
        "otherOrganisingBody": "coursera",
        "organisingInstitute": "other",
        "otherOrganisingInstitute": "University of California, Irvine Division of Conti",
        "relevantPo": ['NA'],
        "program": "1",
        "financialSupport": "yes",
        "amount": 0,
    },
    {
        "id": "2",
        "empId": "2",
        "academicYear": "2020",
        "programDetails": "Create Informative Presentations with Google Slides",
        "startDate": "2020-03-08",
        "endDate": "2020-04-06",
        "duration": 30,
        "location": "pandharpur",
        "certificateDocument": "",
        "organisingBody": "other",
        "otherOrganisingBody": "coursera",
        "organisingInstitute": "other",
        "otherOrganisingInstitute": "Freedom Learning Group",
        "relevantPo": ['po1','po2'],
        "program": "1",
        "financialSupport": "no",
        "amount": 0,
    },
    {
        "id": "3",
        "empId": "1",
        "academicYear": "2020",
        "programDetails": "Introduction to Project Management",
        "startDate": "2020-03-08",
        "endDate": "2020-04-06",
        "duration": 30,
        "location": "pandharpur online",
        "certificateDocument": "",
        "organisingBody": "other",
        "otherOrganisingBody": "coursera",
        "organisingInstitute": "other",
        "otherOrganisingInstitute": "coursera",
        "relevantPo": ['NA'],
        "program": "1",
        "financialSupport": "no",
        "amount": 0,
		}
];


const mockMethods = [
  {
    url: "/:api?/:tenant?/v1/employee/employee_sttp/list",
    method: "GET",
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
    url: "/:api?/:tenant?/v1/employee/employee_sttp/get/:id?",
    method: "GET",
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
