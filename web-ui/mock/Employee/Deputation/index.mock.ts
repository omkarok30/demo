import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const data = [
    {
      "id": "1",
      "empId": "1",
      'degree_id':'1',
      "deputation_date" :'2020-05-21',
      "description"   :'',   
      "to_date"    :'2020-05-21',      
      "document"  :'',      
      "status"  :'Inactive',        
      "is_freezed"  :'',     
      "deactivatereason":'',
    },
  ];
  


const mockMethods = [
  {
    url: "/:api?/:tenant?/v1/employee/employee_deputation/list",
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
    url: "/:api?/:tenant?/v1/employee/employee_deputation/get/:id?",
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
