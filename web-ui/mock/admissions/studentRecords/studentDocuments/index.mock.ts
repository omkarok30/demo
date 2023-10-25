import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const responseData = [
  {
    id: "1",
    studId: "1",
    nameOfDocument: "10th Markslist",
    document:
      "https://sveri-engg.s3.ap-south-1.amazonaws.com/1b7e2d7dfc82f41d4dae41526bb4bcaeb2cca90010.JPG",
  },
  {
    id: "2",
    studId: "1",
    nameOfDocument: "12th Markslist",
    document:
      "https://sveri-engg.s3.ap-south-1.amazonaws.com/1b7e2d7dfc82f41d4dae41526bb4bcaeb2cca90010.JPG",
  },
  {
    id: "3",
    studId: "2",
    nameOfDocument: "10th Markslist",
    document:
      "https://sveri-engg.s3.ap-south-1.amazonaws.com/1b7e2d7dfc82f41d4dae41526bb4bcaeb2cca90010.JPG",
  },
  {
    id: "4",
    studId: "3",
    nameOfDocument: "12th Markslist",
    document:
      "https://sveri-engg.s3.ap-south-1.amazonaws.com/a09f3851371cf34383bc1836dd91aa7df813a1ccMtech%20Degree%20certificate.JPG",
  },
];

const mockMethods = [
  {
    url: "/:api?/:tenant?/v1/admissions/student_record/student_document/list",
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
    url: "/:api?/:tenant?/v1/admissions/student_record/student_document/get/:id?",
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
