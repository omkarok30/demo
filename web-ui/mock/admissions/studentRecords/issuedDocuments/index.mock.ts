import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const responseData = [
  {
    id: "1",
    dateofIssue: "2021-05-21",
    typeofDocument: "10th Markslist",
    purpose: "purpose1",
    viewDocument:
      "https://sveri-engg.s3.ap-south-1.amazonaws.com/1b7e2d7dfc82f41d4dae41526bb4bcaeb2cca90010.JPG",
  },
  {
    id: "2",
    dateofIssue: "2021-05-21",
    typeofDocument: "10th Markslist",
    purpose: "purpose2",
    viewDocument:
      "https://sveri-engg.s3.ap-south-1.amazonaws.com/1b7e2d7dfc82f41d4dae41526bb4bcaeb2cca90010.JPG",
  },
  {
    id: "3",
    dateofIssue: "2021-05-21",
    typeofDocument: "10th Markslist",
    purpose: "purpose3",
    viewDocument:
      "https://sveri-engg.s3.ap-south-1.amazonaws.com/1b7e2d7dfc82f41d4dae41526bb4bcaeb2cca90010.JPG",
  },
  {
    id: "4",
    dateofIssue: "2021-05-21",
    typeofDocument: "10th Markslist",
    purpose: "purpose4",
    viewDocument:
      "https://sveri-engg.s3.ap-south-1.amazonaws.com/1b7e2d7dfc82f41d4dae41526bb4bcaeb2cca90010.JPG",
  },
];

const mockMethods = [
  {
    url: "/:api?/:tenant?/v1/admissions/student_record/issued_documents/list",
    method: "GET",
    body() {
      return {
        code: 200,
        data: {
          total: responseData.length,
          records: responseData,
        },
      };
    },
  },
  {
    url: "/:api?/:tenant?/v1/admissions/student_record/issued_documents/get/:id?",
    method: "GET",
    body({ params }) {
      const rec = _.find(responseData, { id: params.id });
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
