import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const data = [
  {
    id: 1,
    programId: "",
    academicYear: 2020,
    className: "first",
    division: "1",
    semester: "1",
    numberOfBatches:null,
    isFy: "true",
  },
  {
    id:"2",
    programId: "",
    academicYear: 2020,
    className: "first",
    division: "1",
    semester: "2",
    numberOfBatches:"3",
    isFy: "true",
  },
  {
    id: 3,    
        programId: "",
        academicYear: 2021,
        className: "first",
        division: "1",
        semester: "2",
        numberOfBatches:"3",
        isFy: "true",
      
  },
  {
    id: 4,    
        programId: "",
        academicYear: 2021,
        className: "first",
        division: "1",
        semester: "2",
        numberOfBatches:null,
        isFy: "true",
      
  },
  {
    id: 5,    
        programId: "",
        academicYear: 2021,
        className: "first",
        division: "5",
        semester: "2",
        numberOfBatches:"2",
        isFy: "true",
      
  },
  {
    id: 6,    
        programId: "",
        academicYear: 2021,
        className: "first",
        division: "3",
        semester: "1",
        numberOfBatches:"3",
        isFy: "true",
      
  },
  {
    id: 7,    
        programId: "",
        academicYear: 2021,
        className: "first",
        division: "5",
        semester: "1",
        numberOfBatches:"3",
        isFy: "true",
      
  },
];

const mockMethods = [
  {
    url: "/:api?/:tenant?/v1/fyacademics/batches/list",
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
    url: "/:api?/:tenant?/v1/fyacademics/batches/get/:id?",
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
