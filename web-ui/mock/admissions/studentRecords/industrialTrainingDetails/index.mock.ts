import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const responseData = [
  {
    id: "1",
    studId: "1",
    academicYear: "2020",
    organisationDetails: "sveri",
    startDate: "12-07-2020",
    endDate: "12-09-2020",
    duration: "2",
    location: "Pandharpur",
    document: "this is about RWork",
    relevantPo:'[po1,po2]',
    relevantCo: "test technical knowledge",
  },
  {
    id: "2",
    studId: "1",
    academicYear: "2020",
    organisationDetails: "sveri",
    startDate: "10-07-2020",
    endDate: "10-09-2020",
    duration: "2",
    location: "Pune",
    document: "this is about RWork",
    relevantPo:'[po1,po2]',
    relevantCo: "test python knowledge",
  },
];

const mockMethods = [
  {
    url: "/:api?/:tenant?/v1/admissions/student_record/co-curricular/industrial_training_details/list",
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
    url: "/:api?/:tenant?/v1/admissions/student_record/co-curricular/industrial_training_details/get/:id?",
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
