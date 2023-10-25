import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const data = [
  {
    id: "1",
    nameTeachingstaff: "",
    division: "",
    semester: "FY",
    courses: "",
    workload: "",
   
  },
  {
    id: "2",
    nameTeachingstaff: "",
    division: "",
    semester: "FY",
    courses: "",
    workload: "",
  },
  {
    id: "3",
    nameTeachingstaff: "",
    division: "",
    semester: "FY",
    courses: "",
    workload: "",
  },
  {
    id: "4",
    nameTeachingstaff: "",
    division: "",
    semester: "FY",
    courses: "",
    workload: "",
  },
];

const mockMethods = [
  {
    url: "/:api?/:tenant?/v1/fyacademics/workloaddisrtibutionwise/list",
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
    url: "/:api?/:tenant?/v1/fyacademics/workloaddisrtibutionwise/get/:id?",
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