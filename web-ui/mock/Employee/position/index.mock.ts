import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";


const data = [
    {
      "id": "1",
      "empId": "1",
      "position": "rworkAdministrator",
      "positionStatus": "inactive",
      "fromDate": "2021-05-21",
      "toDate": "2022-06-21",
      "isFreezed": false,
      "positionDocument": "",
    },
    {
      "id": "2",
      "empId": "1",
      "position": "studentcoordinator",
      "positionStatus": "inactive",
      "fromDate": "2020-05-21",
      "toDate": "2022-05-21",
      "isFreezed": true,
      "positionDocument": "504fc8e87842b390a6f5aa46ec81159e1c943a6fTC161CS12037.pdf",
    },
   {
      "id": "3",
      "empId": "2",
      "position": "rworkAdministrator",
      "positionStatus": "active",
      "fromDate": "2021-05-21",
      "toDate": "",
      "isFreezed": false,
      "positionDocument": "",
    },
    {
      "id": "4",
      "empId": "2",
      "position": "studentcoordinator",
      "positionStatus": "inactive",
      "fromDate": "2020-05-21",
      "toDate": "2022-05-21",
      "isFreezed": true,
      "positionDocument": "",
    },
  ];
  


const mockMethods = [
  {
    url: "/:api?/:tenant?/v1/employee/employee_position/list",
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
    url: "/:api?/:tenant?/v1/employee/employee_position/get/:id?",
    method: "GET",
    body({ params }) {
      const rec = _.find(data, { id: params.id });
      return {
        code: 200,
        data: {
          total: size(rec),
          records: data[0],
        },
      };
    },
  },
] as MockOptions;

export default defineMock(mockMethods);
