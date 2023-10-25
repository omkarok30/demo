import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";


const data = [
    {
        "id": 1,
        "userId": 1,
        "collegeName": "sveri's college of engineering, pandharpur",
        "levelOfEducation": 'Diploma',
        "universityName": "solapur university",
        "percentage": 70.43,
        "passingYear": "2010",
        "degree": "BE",
        "specialization": "computer science and engineering",
        "certificateDocument": "",
        "registrationYear": null
    },
    {
        "id": 2,
        "userId": 1,
        "collegeName": "piit, new panvel",
        "levelOfEducation": "UG",
        "universityName": "university of mumbai",
        "percentage": 68.76,
        "passingYear": "2013",
        "degree": "3",
        "specialization": "information technology",
        "certificateDocument": "",
        "registrationYear": null
    },
    {
        "id": 3,
        "userId": 2,
        "collegeName": "skn coe, korti",
        "levelOfEducation": "X",
        "universityName": "",
        "percentage": 76.34,
        "passingYear": "2010",
        "degree": "",
        "specialization": "",
        "certificateDocument": "",
        "registrationYear": null
    },
    {
        "id": 4,
        "userId": 2,
        "collegeName": "Walchand institute of technology, solapur",
        "levelOfEducation": "PG",
        "universityName": "Solapur university",
        "percentage": 64.79,
        "passingYear": "2020",
        "degree": "mtech",
        "specialization": "CSE",
        "certificateDocument": "",
        "registrationYear": null
    }
];




const mockMethods = [
    {
      url: "/:api?/:tenant?/v1/employee/employee_qualification/list",
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
      url: "/:api?/:tenant?/v1/employee/employee_qualification/get/:id?",
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
  