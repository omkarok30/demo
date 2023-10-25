import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const responseData = [
  {
    id: "1",
    userId: "1",
    academicYear: "2020",
    courseName: "core java",
    courseDuration: "4",
    mode: "online",
    startDate: "12-07-2020",
    endDate: "12-07-2020",
    organizationName: "Qspider",
    relevantPo:'[po1,po2]',
    document: "",
  },
  {
    id: "2",
    userId: "1",
    academicYear: "2021",
    courseName: "Advance java",
    courseDuration: "20",
    mode: "offline",
    startDate: "09-07-2020",
    endDate: "09-07-2020",
    organizationName: "IT consulting and training",
    relevantPo:'[po1,po2]',
    document: "",
  },
];

const mockMethods = [
  {
    url: "/:api?/:tenant?/v1/admissions/student_record/co-curricular/addoncertificate_details/list",
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
    url: "/:api?/:tenant?/v1/admissions/student_record/co-curricular/addoncertificate_details/get/:id?",
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
