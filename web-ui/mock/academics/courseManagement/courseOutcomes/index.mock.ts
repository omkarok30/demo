import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const data = [
    {
        "id": 1,
        "courseId": 1,
        "coCode": "C011-18.1",
        "coStatement": "Identify the AI based problems",
        "bloomLevel":['bl1','bl2'],
        "approvedCo":""

        },
        {
        "id": 2,
        "courseId": 1,
        "coCode": "C011-18.2",
        "coStatement": "Apply techniques to solve the AI problems.",
        "bloomLevel":['bl1','bl2'],
        "approvedCo":""

        }
];
const mockMethods = [
  {
    url: "/:api?/:tenant?/v1/academics/courseManagement/courseOutcomes/get/:courseId?",
    method: "GET",
    body({ params }) {
      //const rec = _.find(data, { courseId: params.courseId });
      return {
        code: 200,
        data: {
          total: size(data),
          records: data,
        },
      };
    },
  },
] as MockOptions;

export default defineMock(mockMethods);