import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const responseData = [
  {
    id: "1",
    studentId: "1",
    academicYear: "2021",
    eventLevel: "department",
    participationType: "withinState",
    country: "China",
    activityName: "First Activity",
    otherActivityName: "Other Activity",
    venuePlaceOfActivity: "Mumbai",
    activityDetails: "Details",
    organizingCollaboratingAgency: "Yes",
    otherOrganizingCollaboratingAgencyName: "Talent A",
    dateOfEvent: "12-07-2020", // Date of Participation
    schemeName: "A scheme",
    facultyCoordinator: "John Doe",
    studentParticipants: "Student A",
    achievement: "firstPrice",
    achievementAwardDetails: "Details",
    relevantPo: "test technical knowledge",
    relevantCo: "",
    linkToActivityDocs: "path_to_com",
    document: "",
  },
];

const mockMethods = [
  {
    url: "/:api?/:tenant?/v1/admissions/student_record/extra-curricular/extension-activity/list",
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
    url: "/:api?/:tenant?/v1/admissions/student_record/extra-curricular/extension-activity/get/:id?",
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
