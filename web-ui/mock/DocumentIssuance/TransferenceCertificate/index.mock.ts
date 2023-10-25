import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const data = [
  {
    id: '1',
    studentId: "1",
    issueStatus: "issued",
    transferCertificateNumber: "20220001",
    migrationCertificateNumber: "M20220001",
    dateOfIssue: "11-10-2022",
    remark: "GOOD",
    conduct: "GOOD",
    dateOfLeave: "07-09-2022",
    uploadAcknowlegementStatus: 1,
    uploadDocuments: "9218",
    acknowledgementUploadDate: "",
    printDuplicateStatus: "",
    duplicateAcknowledgementDocument: null,
    duplicate1AcknowledgementDocument: null,
    dateOfIssueMigration: "",
    dateOfIssueDuplicate1: null,
    dateOfIssueDuplicate2: null,
    printMigration: "2",
    uploadMigrationDocument: null,
    progress: null,
    leavingReason:
      "COMPLETED BACHELOR OF ENGINEERING - COMPUTER SCIENCE AND ENGINEERING IN SEPTEMBER 2022",
  },
  {
    id: '2',
    studentId: "2",
    issueStatus: "issued",
    transferCertificateNumber: "20220002",
    migrationCertificateNumber: "M20220002",
    dateOfIssue: "20-09-2022",
    remark: "GBHNJM",
    conduct: "FGHNJ",
    dateOfLeave: "06-09-2022",
    uploadAcknowlegementStatus: null,
    uploadDocuments: "",
    acknowledgementUploadDate: "",
    printDuplicateStatus: "",
    duplicateAcknowledgementDocument: null,
    duplicate1AcknowledgementDocument: null,
    dateOfIssueMigration: "20-09-2022",
    dateOfIssueDuplicate1: null,
    dateOfIssueDuplicate2: null,
    printMigration: "2",
    uploadMigrationDocument: null,
    progress: null,
    leavingReason:
      "COMPLETED BACHELOR OF ENGINEERING - COMPUTER SCIENCE AND ENGINEERING IN SEPTEMBER 2022",
  },
];
const mockMethods = [
  {
    url: "/:api?/:tenant?/v1/document/transferenceCertificate/list",
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
    url: "/:api?/:tenant?/v1/document/transferenceCertificate/get/:id?",
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
