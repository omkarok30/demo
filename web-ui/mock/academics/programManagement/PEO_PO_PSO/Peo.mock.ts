import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";
const data = [
  {
    id: '1',
    programId: "3",
    academicYear: 2019,
    peoNumber: "PEO1",
    peoStatement:
      "Apply technical expertise in their professional career for contemporary problem solving in the field of Electronics and Telecommunication Engineering",
    approvePeo: "BOARD OF GOVERNANCE : 02-03-2014"
  },
  {
    id: '2',
    programId: "3",
    academicYear: 2019,
    peoNumber: "PEO2",
    peoStatement:
      "Respond to the growing and changing needs of society through lifelong learning",
    approvePeo: "BOARD OF GOVERNANCE : 02-03-2014"
  },
  {
    id: '3',
    programId: "3",
    academicYear: 2020,
    peoNumber: "PEO1",
    peoStatement:
      "Demonstrate leadership, commitment and maintain ethics in professional career",
    approvePeo: "BOARD OF GOVERNANCE : 02-03-2014"
  },
  {
    id: '4',
    programId: "3",
    academicYear: 2020,
    peoNumber: "PEO1",
    peoStatement:
      "Demonstrate effective communication skills and the ability to work efficiently at individual  level and as part of  a team",
    approvePeo: "BOARD OF GOVERNANCE : 02-03-2014"
  }
];

const mockMethods = [
  {
    url: "/:api?/:tenant?/v1/academics/program-management/peo/list",
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
    url: "/:api?/:tenant?/v1/academics/program-management/peo/get/:id?",
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
