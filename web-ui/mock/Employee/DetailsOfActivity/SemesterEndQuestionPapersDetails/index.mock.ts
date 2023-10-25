import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const data = [
  {
    "id": "1",
    "academicYear": 2019,
    "levelOfProgram": "diploma",
    "courseName": "mobile application development",
    "certificateDocument": "",
    "empId": 1
  },
  {
    "id": "2",
    "academicYear": 2018,
    "levelOfProgram": "diploma",
    "courseName": "software engineering",
    "certificateDocument": "",
    "empId": 2
  },
  {
    "id": "3",
    "academicYear": 2019,
    "levelOfProgram": "UG",
    "courseName": "Non-conventional machining",
    "certificateDocument": "",
    "empId": 1
  },
  {
    "id": "4",
    "academicYear": 2020,
    "levelOfProgram": "UG",
    "courseName": "Software Engineering, Distributed System",
    "certificateDocument": "",
    "empId": 1
  }

];


const mockMethods = [
  {
    url: "/:api?/:tenant?/v1/employee/employee_semester_end_question_papers_details/list",
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
    url: "/:api?/:tenant?/v1/employee/employee_semester_end_question_papers_details/get/:id?",
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
