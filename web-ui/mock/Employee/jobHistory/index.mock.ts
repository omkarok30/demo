import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";


const data = [
    {
      "id": "1",
      "empId": "1",
      "fromDate": "2021-05-21",
      "toDate": "2021-05-23",
      "designation":"assistantprofessor",
      "appointmentStatus": "active",
      "departmentId":"2",
      "dateOfAppointment":"2021-05-20",
      "joiningYear":"2021",
      "toYear":"",
      "appointmentType":"adhoc",
      "subType":"regular",
      "appointmentDocument":"",
      "userType":"teaching",
      "anotherDesignation":"",
    },
     {
      "id": "2",
      "empId": "2",
      "fromDate": "2020-05-21",
      "toDate": "",
      "designation":"assistantlibrarian",
      "appointmentStatus": "active",
      "departmentId":"2",
      "dateOfAppointment":"2020-05-15",
      "joiningYear":"2020",
      "toYear":"",
      "appointmentType":"adhoc",
      "subType":"regular",
      "appointmentDocument":"",
      "userType":"non-teaching",
      "anotherDesignation":"",
    },
  ];


const mockMethods = [
  {
    url: "/:api?/:tenant?/v1/employee/employee_job_history/list",
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
    url: "/:api?/:tenant?/v1/employee/employee_job_history/get/:id?",
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
