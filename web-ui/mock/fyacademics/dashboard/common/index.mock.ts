import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const data = [
  {
    id: "1",
    courses: "",
    semester: "FY",
    coCreation: "",
    toolFrezed: "",
    coTarget: "",
    toolcoLinking: "",
  
  },
  {
    id: "2",
    courses: "",
    semester: "FY",
    coCreation: "",
    toolFrezed: "",
    coTarget: "",
    toolcoLinking: "",
  
  },
  {
    id: "3",
    courses: "",
    semester: "FY",
    coCreation: "",
    toolFrezed: "",
    coTarget: "",
    toolcoLinking: "",
  
  },
  {
    id: "4",
    courses: "",
    semester: "FY",
    coCreation: "",
    toolFrezed: "",
    coTarget: "",
    toolcoLinking: "",
  
  },
];

const mockMethods = [
  {
    url: "/:api?/:tenant?/v1/fyacademics/common/list",
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
    url: "/:api?/:tenant?/v1/fyacademics/common/get/:id?",
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