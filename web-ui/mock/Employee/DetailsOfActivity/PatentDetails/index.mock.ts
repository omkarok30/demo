import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const data = [
    {
        "id": "1",
        "empId": "1",
        "application_no": "3687/MUM/2014",
        "dateOfFilling": "2014-11-20",
        "applicantName": "1 . Bhaskar Dhondi Gaikwad 2 . Prashant Maruti Pawar 3 . Babruvan Pandurang Ronge",
        "inventionTitle": "APPARATUS FOR MEASURING ELONGATION OF CONVEYOR CHAINS AND LIFE ESTIMATION THEREOF",
        "applicationStatus": "granted",
        "grantDate": "2020-05-18",
        "considerForAccreditation": "no"
    },
    {
        "id": "2",
        "empId": "1",
        "application_no": "2834/MUM/2015",
        "dateOfFilling": "2015-12-20",
        "applicantName": "M. B. Kulkarni, Dr. p. m. ghanegaonkar",
        "inventionTitle": "A Method and System of Biogas Generation from Floral Waste",
        "applicationStatus": "filed",
        "grantDate": "",
        "considerForAccreditation": "yes"
    },
    {
        "id": "3",
        "empId": "2",
        "application_no": "201921033981  ",
        "dateOfFilling": "2019-08-23",
        "applicantName": "Husain K Bhaldar",
        "inventionTitle": "Design & Development of Miniaturized 2x1 square array of Microstrip Textile Antenna using jean as dielectric material & operating at 1.9642GHz & 2.45GHz with gain of 10dBi & 8.07dBi used for wireless application",
        "applicationStatus": "filed",
        "grantDate": "",
        "considerForAccreditation": "no"
    },
];



const mockMethods = [
	{
	  url: "/:api?/:tenant?/v1/employee/employee_patent_details/list",
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
	  url: "/:api?/:tenant?/v1/employee/employee_patent_details/get/:id?",
	  method: "GET",
	  body({ params }) {
		const rec = _.find(data, { id: params.id });
		return {
		  code: 200,
		  data: {
			total: size(rec),
			records: rec,
		  },
		};
	  },
	},
  ] as MockOptions;
  
  export default defineMock(mockMethods);
  