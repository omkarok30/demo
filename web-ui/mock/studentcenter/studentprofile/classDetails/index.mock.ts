import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const responseData = [
  {
    id: "1",
    academicYear: "2020",
    class_name: "department",
    semester: "newsletter",
    division: "A",
    
  },
  {
    id: "2",
    academicYear: "2020",
    class_name: "department",
    semester: "newsletter",
    division: "A",
    
  },
];

const mockMethods = [
  {
    url: "/:api?/:tenant?/v1/studentcenter/student_profile/classdetails/list",
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
    url: "/:api?/:tenant?/v1/studentcenter/student_profile/classdetails/get/:id?",
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
