import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const data = [
  {
    id: "1",
    levelOfEducation: 'UG',
    code: "C011-18",
    type: "university",
    name: "ENGINEERING PHYSICS",
    shortName: "EP",
    curriculumComp: 'BASIC SCIENCE',
    departmentId: 1, //changed
    programId:'2',//changed
    scheme: "",//changed
    isElective: false, //changed
    batch_applicable: 0,
    isactive: true,
    introductionYear: null,
    documentLink: null,
    courseHours: "5",//changed
    courseCredits: "4",//changed
    courseMethdCredits: [//changed
      {
        method: "theory",
        hoursPerWeek: "3",
        credits: "2"
      },
      {
        method: "practical",
        hoursPerWeek: "2",
        credits: "2"
      }
    ]
  },
  {
    id: "2",
    levelOfEducation: 'Diploma',
    code: "EL211-19",
    type: "university",
    name: "ENGINEERING MATHEMATICS-III",
    shortName: "EMIII",
    curriculumComp: "BASIC SCIENCE",
    departmentId: 1, //changed
    programId: "2",//changed
    scheme: "",//changed
    isElective: false, //changed
    batch_applicable: 0,
    isactive: true,
    introductionYear: "2019",
    documentLink: null,
    courseHours: "5",//changed
    courseCredits: "4",//changed
    courseMethdCredits: [//changed
      {
        method: "theory",
        hoursPerWeek: "3",
        credits: "2"
      },
      {
        method: "practical",
        hoursPerWeek: "2",
        credits: "2"
      }
    ]
  },
  {
    id: "3",
    levelOfEducation: 'Diploma',
    code: "C012-18",
    type: "university",
    name: "ENGINEERING CHEMISTRY",
    shortName: "EC",
    curriculumComp: 'BASIC SCIENCE',
    departmentId: 1, //changed
    programId: "1",//changed
    scheme: "",//changed
    isElective: false, //changed
    batch_applicable: 0,
    isactive: false,
    introductionYear: null,
    documentLink: null,
    courseHours: "5",//changed
    courseCredits: "4",//changed
    courseMethdCredits: [//changed
      {
        method: "theory",
        hoursPerWeek: "3",
        credits: "2"
      },
      {
        method: "practical",
        hoursPerWeek: "2",
        credits: "2"
      }
    ]
  },
  {
    id: "4",
    levelOfEducation: 'UG',
    code: "EL212-19",
    type: "institute",
    name: "ELECTRICAL MACHINES-I",
    shortName: "EM1",
    curriculumComp: 'BASIC SCIENCE',
    departmentId: 1, //changed
    programId: "4",//changed
    scheme: "",//changed
    isElective: false, //changed
    batch_applicable: 0,
    isactive: true,
    introductionYear: "2019",
    documentLink: null,
    courseHours: "5",//changed
    courseCredits: "4",//changed
    courseMethdCredits: [//changed
      {
        method: "theory",
        hoursPerWeek: "3",
        credits: "2"
      },
      {
        method: "practical",
        hoursPerWeek: "2",
        credits: "2"
      }
    ]
  }
];
const mockMethods = [
  {
    url: "/:api?/:tenant?/v1/academics/courseManagement/manageCourses/list",
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
    url: "/:api?/:tenant?/v1/academics/courseManagement/manageCourses/get/:id?",
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
