import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const data = [
  {
    id: "1",
    courseId: "1",
    degreeLevel: "UG",
    departmentId: "2",
    academicYear: "2020",
    programId: "2",
    className: "second",
    semester: "1",
    mainFaculty: 2,
    division: "1",
    batch: 2,
    practicalType: "",
    tutorialType: "batchwise",
    projectType: "",
    internshipFaculty: "1",
    selfFaculty: "1",
    theoryHours: 3,
    internshipHours: 3,
    selflearningHours: 4,
    courseMethod: [
      "theory",
      "practical",
      "tutorial",
      "project",
      "internship",
      "self"
    ]
  },
  {
    id: "4",
    courseId: "1",
    degreeLevel: "ug",
    departmentId: 2,
    academicYear: "2020",
    programId: "2",
    className: "second",
    semester: "1",
    mainFaculty: 1,
    division: "1",
    batch: 0,
    practicalType: "batchwise",
    tutorialType: "entiredivision",
    projectType: "",
    internshipFaculty: "",
    selfFaculty: "",
    theoryHours: 4,
    internshipHours: "",
    selflearningHours: "",
    courseMethod: ["theory", "practical", "tutorial"]
  },
  {
    id: "3",
    courseId: "4",
    degreeLevel: "ug",
    departmentId: "2",
    academicYear: "2019",
    programId: "2",
    className: "second",
    semester: "1",
    mainFaculty: 1,
    division: "1",
    batch: 0,
    practicalType: "batchwise",
    tutorialType: "entiredivision",
    projectType: "entiredivision",
    internshipFaculty: "",
    selfFaculty: "",
    theoryHours: "4",
    internshipHours: "",
    selflearningHours: "",
    courseMethod: ["theory", "practical", "tutorial", "project"]
  }
];
const tools = [
  {
    id: 1,
    courseId: 1,
    toolId: "1",
    courseMethod: 1,
    courseFacultyLinkingId: 1,
    considerForResult: "true"
  },
  {
    id: 2,
    courseId: 1,
    toolId: "2",
    courseMethod: 1,
    courseFacultyLinkingId: 1,
    considerForResult: "true"
  },
  {
    id: 3,
    courseId: 1,
    toolId: "3",
    courseMethod: 1,
    courseFacultyLinkingId: 2,
    considerForResult: "false"
  }
];
const tutorial = [
  {
    id: 1,
    courseFacultyLinkingId: 1,
    tutorialFaculty: "1",
    status: 1,
    batchNo: 1,
    tutorialHours: 2
  },
  {
    id: 2,
    courseFacultyLinkingId: 3,
    tutorialFaculty: "2",
    status: 1,
    batchNo: 1,
    tutorialHours: 3
  }
];
const project = [
  {
    id: 1,
    courseFacultyLinkingId: 1,
    projectFaculty: "2",
    status: 1,
    batchNo: 1,
    projectHours: 3
  }
];
const practical = [
  {
    id: 1,
    courseFacultyLinkingId: 1,
    practicalFaculty: "1",
    status: 1,
    batchNo: 1,
    practicalHours: 2
  },
  {
    id: 2,
    courseFacultyLinkingId: 1,
    practicalFaculty: "2",
    status: 1,
    batchNo: 2,
    practicalHours: 3
  },
  {
    id: 3,
    courseFacultyLinkingId: 3,
    practicalFaculty: "2",
    status: 1,
    batchNo: 1,
    practicalHours: 3
  }
];
const theory = [
  {
    id: 1,
    courseFacultyLinkingId: 1,
    theoryFaculty: "1",
    status: 1,
    theoryHours: 2
  },
  {
    id: 2,
    courseFacultyLinkingId: 1,
    theoryFaculty: "1",
    status: 1,
    theoryHours: 2
  },
  {
    id: 3,
    courseFacultyLinkingId: 3,
    theoryFaculty: "1",
    status: 1,
    theoryHours: 2
  }
];
const mockMethods = [
  {
    url: "/:api?/:tenant?/v1/academics/course_management/course_faculty_linking/list",
    method: "GET",
    body() {
      return {
        code: 200,
        data: {
          total: data.length,
          records: data
        }
      };
    }
  },
  {
    url: "/:api?/:tenant?/v1/academics/course_management/course_faculty_linking/get/:id?",
    method: "GET",
    body({ params }) {
      const rec = _.find(data, { id: params.id });
      return {
        code: 200,
        data: {
          total: size(rec),
          records: rec
        }
      };
    }
  },
  {
    url: "/:api?/:tenant?/v1/academics/course_management/course_faculty_linking/tools/list",
    method: "GET",
    body() {
      return {
        code: 200,
        data: {
          total: tools.length,
          records: tools
        }
      };
    }
  },
  {
    url: "/:api?/:tenant?/v1/academics/course_management/course_faculty_linking/tutorial/list",
    method: "GET",
    body() {
      return {
        code: 200,
        data: {
          total: tutorial.length,
          records: tutorial
        }
      };
    }
  },
  {
    url: "/:api?/:tenant?/v1/academics/course_management/course_faculty_linking/project/list",
    method: "GET",
    body() {
      return {
        code: 200,
        data: {
          total: project.length,
          records: project
        }
      };
    }
  },
  {
    url: "/:api?/:tenant?/v1/academics/course_management/course_faculty_linking/practical/list",
    method: "GET",
    body() {
      return {
        code: 200,
        data: {
          total: practical.length,
          records: practical
        }
      };
    }
  },
  {
    url: "/:api?/:tenant?/v1/academics/course_management/course_faculty_linking/theory/list",
    method: "GET",
    body() {
      return {
        code: 200,
        data: {
          total: theory.length,
          records: theory
        }
      };
    }
  }
] as MockOptions;

export default defineMock(mockMethods);
