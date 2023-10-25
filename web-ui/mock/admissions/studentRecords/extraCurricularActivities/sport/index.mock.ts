import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const responseData = [
  {
    id: "1",
    studentId: "1",
    academicYear: "2020",
    eventLevel: "department",
    participationType: "withinState",
    country: "China",
    sportName: "Cricket",
    sportType: "Team",
    considerForAccredation: "yes", // field not present in schema
    //member: [ 'Mike Doe', 'John Doe' ], // field not present in schema
    detailsOfParticipation: "Participated in game",
    organizationName: "sveri",
    dateOfEvent: "12-07-2020", // Date of Participation
    achievement: "firstPrice",
    linkToActivityDocs: "path_to_com",
    relevantPo: "test technical knowledge",
    document: "",
  },
];

const mockMethods = [
  {
    url: "/:api?/:tenant?/v1/admissions/student_record/extra-curricular/sport/list",
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
    url: "/:api?/:tenant?/v1/admissions/student_record/extra-curricular/sport/get/:id?",
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
