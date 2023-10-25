import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const responseData = [
  {
    id: "1",
    academicYear: "2020",
    className: "first",
    sem1Percentage: "87.34",
    sem1Sgpa: "8.79",
    sem1Status: "pass",
    sem2Percentage: "87.34",
    sem2Sgpa: "8.79",
    sem2Status: "atkt",
    overallResult: "pass",
    overallPercentage: "87",
    overallCgpa: "8.7",
    freezed: false,
  },
  {
    id: "2",
    academicYear: "2020",
    className: "first",
    sem1Percentage: "87.34",
    sem1Sgpa: "8.79",
    sem1Status: "pass",
    sem2Percentage: "87.34",
    sem2Sgpa: "8.79",
    sem2Status: "fail",
    overallResult: "pass",
    overallPercentage: "87",
    overallCgpa: "8.7",
    freezed: true,
  },
];

const mockMethods = [
  {
    url: "/:api?/:tenant?/v1/admissions/student_record/overall-result/list",
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
    url: "/:api?/:tenant?/v1/admissions/student_record/overall-result/get/:id?",
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
