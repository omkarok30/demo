import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";


const data = [
    {
        "id": "1",
        "empId": "1",
        "address1": "At Songiri Near Z.P.School",
        "address2": "Post - khasgaon",
        "district": "osmanabad",
        "tehsil": "paranda",
        "city": "paranda",
        "state": "maharashtra",
        "country": "india",
        "pincode": "413502",
        "telephoneNumber": "837332132",
        "mobileNumber": "7387046845",
        "alternateNumber": "9892830200",
        "locationCategory": "rural",
        "isSame": "false",
        "addressType": "permenant"
    },
    {
        "id": "2",
        "empId": "2",
        "address1": "At rohkal Near Z.P.School",
        "address2": "Post - rohkal",
        "district": "osmanabad",
        "tehsil": "paranda",
        "city": "paranda",
        "state": "maharashtra",
        "country": "india",
        "pincode": "413502",
        "telephoneNumber": "837332132",
        "mobileNumber": "7387046845",
        "alternateNumber": "9892830200",
        "locationCategory": "rural",
        "isSame": "false",
        "addressType": "present"
    }
];

  const mockMethods = [
    {
      url: "/:api?/:tenant?/v1/employee/employee_address/list",
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
      url: "/:api?/:tenant?/v1/employee/employee_address/get/:id?",
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
  