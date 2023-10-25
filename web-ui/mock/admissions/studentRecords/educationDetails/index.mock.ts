import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const responseData = [
  {
    id: "1",
    qualification: "Diploma",
    specialization: "Commerce",
    collageName: "LOTUS COLLAGE",
    universityName: "SOLAPUR",
    percentage: "85",
    passingYear: "2020",
    document:
      "https://sveri-engg.s3.ap-south-1.amazonaws.com/1b7e2d7dfc82f41d4dae41526bb4bcaeb2cca90010.JPG",
  },
  {
    id: "2",
    qualification: "X",
    specialization: "Science",
    collageName: "COLLAGE NAME 1",
    universityName: "Pune",
    percentage: "80",
    passingYear: "2021",
    document: "abc/xyz",
  },
];

const mockMethods = [
  {
    url: "/:api?/:tenant?/v1/admissions/student_record/education-details/list",
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
    url: "/:api?/:tenant?/v1/admissions/student_record/education-details/get/:id?",
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
