import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const data = [
    {
        "id": 1,
        "emp_id": "1",
        "technology": "matlab",
        "level": "beginner",
        "details": "research  in structural dynamics and earthqua",
        "uploadDocument": ""
    },
    {
        "id": 2,
        "emp_id": "2",
        "technology": "MCP",
        "level": "associate",
        "details": "Microsoft Certified Professional ",
        "uploadDocument": ""
    }
];


const mockMethods = [
  {
    url: "/:api?/:tenant?/v1/employee/employee_technical_skills/list",
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
    url: "/:api?/:tenant?/v1/employee/employee_technical_skills/get/:id?",
    method: "GET",
    body({ params }) {
      const rec = _.find(data, { id: params.id });
      return {
        code: 200,
        data: {
          total: size(rec),
          records: data[0],
        },
      };
    },
  },
] as MockOptions;

export default defineMock(mockMethods);
