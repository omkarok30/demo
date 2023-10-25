import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const responseData = [
  {
    id: "1",
    studId: "1",
    academicYear: "2020",
    eventLevel: "department",
    participationType: "withinState",
    eventName: "Quiz competation",
    subEventName: "database quize",
    organizationName: "sveri",
    dateOfEvent: "12-07-2020",
    achievement: "firstPrice",
    document: "",
    relevantPo:'[po1,po2]',
    relevantCo: "test technical knowledge",
    country: "india",
  },
  {
    id: "2",
    studId: "2",
    academicYear: "2021",
    eventLevel: "institute",
    participationType: "withinState",
    eventName: "speech competation",
    subEventName: "database quize",
    organizationName: "sveri",
    dateOfEvent: "12-07-2019",
    achievement: "firstPrice",
    document: "",
    relevantPo:'[po1,po2]',
    relevantCo: "test English knowledge",
    country: "",
  },
];

const mockMethods = [
  {
    url: "/:api?/:tenant?/v1/admissions/student_record/co-curricular/technical_details/list",
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
    url: "/:api?/:tenant?/v1/admissions/student_record/co-curricular/technical_details/get/:id?",
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
