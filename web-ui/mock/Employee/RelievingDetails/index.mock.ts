import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";



const data = [
    {
        "id": 1,
        "empId": "1",
        "resignationDate": "2022-02-03",
        "leavingReason": "New Job",
        "releavingDate": "2022-02-10",
        "appointmentDate": "2021-02-01",
        "joiningDate": "2021-02-03",
        "isFreezed": "true",
        "employmentStatus": "Active",
        "resignationLetterDocument": "research  in structural dynamics and earthqua",
        "relivingLetterDocument": "",
        "experienceLetterDocument": "1",
        "transferOrderDate": "matlab",
        "transferDescription": "beginner",
        "transferDocument": "research  in structural dynamics and earthqua",
        "terminationDate": "2022-02-03",
        "terminationReason": "1",
        "terminationLetterDocument": "matlab",
        "retirementDate": "beginner",
        "retirementDocument": "research  in structural dynamics and earthqua",
    },
];


const mockMethods = [
    {
      url: "/:api?/:tenant?/v1/employee/employee_relieving_details/list",
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
      url: "/:api?/:tenant?/v1/employee/employee_relieving_details/get/:id?",
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
  