import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";
const data = [
  {
    id: '1',
    programId: "3",
    academicYear: 2019,
    poNumber: "PO1",
    poStatement:
      "Apply technical expertise in their professional career for contemporary problem solving in the field of Electronics and Telecommunication Engineering",
    approvePo: "BOARD OF GOVERNANCE : 02-03-2014"
  },
  {
    id: '2',
    programId: "3",
    academicYear: 2019,
    poNumber: "PO2",
    poStatement:
      "Respond to the growing and changing needs of society through lifelong learning",
    approvePo: "BOARD OF GOVERNANCE : 02-03-2014"
  },
  {
    id: '3',
    programId: "3",
    academicYear: 2020,
    poNumber: "PO1",
    poStatement:
      "Demonstrate leadership, commitment and maintain ethics in professional career",
    approvePo: "BOARD OF GOVERNANCE : 02-03-2014"
  },
  {
    id: '4',
    programId: "3",
    academicYear: 2020,
    poNumber: "PO1",
    poStatement:
      "Demonstrate effective communication skills and the ability to work efficiently at individual  level and as part of  a team",
    approvePo: "BOARD OF GOVERNANCE : 02-03-2014"
  }
];

const mockMethods = [
  {
    url: "/:api?/:tenant?/v1/academics/program-management/po/list",
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
    url: "/:api?/:tenant?/v1/academics/program-management/po/get/:id?",
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
