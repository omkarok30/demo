import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const responseData = [
  {
    id: "1",
    studId: "1",
    academicYear: "2020",
    publicationLevel: "department",
    publicationType: "newsletter",
    publicationDate: "12-07-2020",
    authorsName: "Trupti",
    typeOfPaper: "journal",
    conferenceDetails: "this is about RWork",
    titleofpaper: "",
    relevantPo:'[po1,po2]',
    relevantCo: "test technical knowledge",
    certificateDocument: "",
    paperDocument: "",
  },
  {
    id: "2",
    studId: "2",
    academicYear: "2020",
    publicationLevel: "department",
    publicationType: "paper",
    publicationDate: "12-07-2020",
    authorsName: "Tejasvi",
    typeOfPaper: "journal",
    conferenceDetails: "this is about RWork",
    titleofpaper: "RWork Educational system",
    relevantPo:'[po1,po2]',
    relevantCo: "test technical knowledge",
    certificateDocument: "",
    paperDocument: "",
  },
];

const mockMethods = [
  {
    url: "/:api?/:tenant?/v1/admissions/student_record/co-curricular/publication_details/list",
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
    url: "/:api?/:tenant?/v1/admissions/student_record/co-curricular/publication_details/get/:id?",
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
