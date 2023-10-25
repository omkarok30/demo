import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";
const data = [
  {
    id: '1',
    programId: "3",
    academicYear: 2019,
    psoNumber: "PSO1",
    psoStatement:
      "Apply technical expertise in their professional career for contemporary problem solving in the field of Electronics and Telecommunication Engineering",
    approvePso: "BOARD OF GOVERNANCE : 02-03-2014"
  },
  {
    id: '2',
    programId: "3",
    academicYear: 2019,
    psoNumber: "PSO2",
    psoStatement:
      "Respond to the growing and changing needs of society through lifelong learning",
    approvePso: "BOARD OF GOVERNANCE : 02-03-2014"
  },
  {
    id: '3',
    programId: "3",
    academicYear: 2020,
    psoNumber: "PSO1",
    psoStatement:
      "Demonstrate leadership, commitment and maintain ethics in professional career",
    approvePso: "BOARD OF GOVERNANCE : 02-03-2014"
  },
  {
    id: '4',
    programId: "3",
    academicYear: 2020,
    psoNumber: "PSO1",
    psoStatement:
      "Demonstrate effective communication skills and the ability to work efficiently at individual  level and as part of  a team",
    approvePso: "BOARD OF GOVERNANCE : 02-03-2014"
  }
];

const mockMethods = [
  {
    url: "/:api?/:tenant?/v1/academics/program-management/pso/list",
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
    url: "/:api?/:tenant?/v1/academics/program-management/pso/get/:id?",
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
  }
] as MockOptions;

export default defineMock(mockMethods);
