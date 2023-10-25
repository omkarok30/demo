import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const data = [
	{
		"id": 1,
		"empId": 1,
		"academicYear": 2021,
		"studentName": "Jadhav Prajakta",
		"degreeType": "pg",
		"thesisTitle": "BW and Gain improvement by using suspended fractal MSA at 2.4GHz",
		"registrationYear": 2021,
		"completionYear": "",
		"completionStatus":"inprogress",
		"synopsisDocument": "",
		"thesisDocument": "",
		"certificateDocument": ""
	},
	{
		"id": 88,
		"empId": 1,
		"academicYear": 2018,
		"studentName": "Changiya Nita",
		"degreeType": "phd",
		"thesisTitle": "Development of an efficient algorithm for segmentation and classification of mammograms masses",
		"registrationYear": 2018,
		"completionYear": "2021-08-22",
		"completionStatus":"conpleted",
		"synopsisDocument": "",
		"thesisDocument": "0",
		"certificateDocument": ""
	},
	{
		"id": 3,
		"empId": 2,
		"academicYear": 2020,
		"studentName": "Mane Ashwini Nagnath",
		"degreeType": "PG",
		"thesisTitle": "EEG Based Drowsiness Detection With Brain Computer Interface for Vehicular System.",
		"registrationYear": 2020,
		"completionYear": "",
		"completionStatus":"inprogress",
		"synopsisDocument": "",
		"thesisDocument": "0",
		"certificateDocument": ""
	}
];


const mockMethods = [
	{
	  url: "/:api?/:tenant?/v1/employee/employee_guided_student_details/list",
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
	  url: "/:api?/:tenant?/v1/employee/employee_guided_student_details/get/:id?",
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
  