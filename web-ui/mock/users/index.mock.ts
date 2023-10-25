import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";


const data = [
  {
    "id": "1",
    "userId": "2003T001",
    "userType":"teaching_staff",
    "firstName": "Trupti",
    "middleName": "Lakshman",
    "lastName": "Doke",
    "isAvailable":'true',
    "email":'trupti@rsensetech.com',
    "isAdmin":'true',  
  },
  {
    "id": "2",
    "userId": "2003T002",
    "userType":"teaching_staff",
    "firstName": "Puja",
    "middleName": "Lakshman",
    "lastName": "Doke",
    "isAvailable":'true',
    "email":'puja@rsensetech.com',
    "isAdmin":'true',  
  },
  {
    "id": "3",
    "userId": "2003T003",
    "userType":"teaching_staff",
    "firstName": "rutuja",
    "middleName": "",
    "lastName": "patil",
    "isAvailable":'true',
    "email":'rutuja@rsensetech.com',
    "isAdmin":'true',  
  },
  {
    "id": "4",
    "userId": "2003T004",
    "userType":"teaching_staff",
    "firstName": "suraj",
    "middleName": "",
    "lastName": "chavan",
    "isAvailable":'true',
    "email":'suraj@gmail.com',
    "isAdmin":'true',  
  },
  {
    "id": "5",
    "userId": "2003NT002",
    "userType":"nonteaching_staff",
    "firstName": "tejsvi",
    "middleName": "",
    "lastName": "pawar",
    "isAvailable":'true',
    "email":'teju@rsensetech.com',
    "isAdmin":'true',  
  }
];

const mockMethods = [
  {
    url: "/:api?/:tenant?/v1/users/list",
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
    url: "/:api?/:tenant?/v1/users/get/:id?",
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
