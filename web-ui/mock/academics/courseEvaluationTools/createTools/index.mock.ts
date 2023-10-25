import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const data = [
  {
    id: "1",
    toolName: "UT-1",
    toolType: "internal",
    toolDependency: "independent",
    toolAssessment: "question_wise",
    toolCoAttainment: true,
    toolPublish: false,
    endSemExam: true,
    inactive: false,
    isUgPg: "UG",
    dependentToolIds: "",
  },
  {
    id: "2",
    toolName: "UT",
    toolType: "internal",
    toolDependency: "dependent",
    toolAssessment: "",
    toolCoAttainment: "",
    toolPublish: true,
    endSemExam: "",
    inactive: false,
    isUgPg: "UG",
    dependentToolIds: [1, 3],
  },
  {
    id: "3",
    toolName: "UT-2",
    toolType: "internal",
    toolDependency: "independent",
    toolAssessment: "question_wise",
    toolCoAttainment: true,
    toolPublish: false,
    endSemExam: false,
    inactive: false,
    isUgPg: "UG",
    dependentToolIds: "",
  },
  {
    id: "4",
    toolName: "ESE",
    toolType: "external",
    toolDependency: "independent",
    toolAssessment: "direct",
    toolCoAttainment: true,
    toolPublish: true,
    endSemExam: true,
    inactive: true,
    isUgPg: "UG",
    dependentToolIds: "",
  },
];

const mockMethods = [
  {
    url: "/:api?/:tenant?/v1/academics/courseEvaluationTools/createTools/list",
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
    url: "/:api?/:tenant?/v1/academics/courseEvaluationTools/createTools/get/:id?",
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
