import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const data = [
	{
		"id": "1",
		"empId": 1,
		"academicYear": "2020-2021",
		"projectTitle": "material testing  third party audit",
		"fundingAgency": "nagalpalika , pwd, irrigation, mseb, mjp",
		"amount": "960819",
		"duration": 12,
		"considerForAccreditation": "yes",
		"complitionOfAssignment": "no",
		"dateOfCompletion": "2020-06-30",
		"consultancyDocument": "",
		"consulatancyMainId": 1,
		"consultacnyDetailsEmployee$empIds":"[2]",
	},
	{
		"id": "2",
		"empId": 2,
		"academicYear": "2019-2020",
		"projectTitle": "MATERIAL TESTING  THIRD PARTY AUDIT, structural audit",
		"fundingAgency": "NAGALPALIKA , PWD, IRRIGATION, MSEB, MJP, grampanchayat,  education officer zp solapur ",
		"amount": "2276283",
		"duration": 12,
		"considerForAccreditation": "no",
		"complitionOfAssignment": "yes",
		"dateOfCompletion": "2019-06-30",
		"consultancyDocument": "",
		"consulatancyMainId": "2",
		"consultacnyDetailsEmployee$empIds":"[1]",

	},
	{
		"id": "3",
		"empId": 2,
		"academicYear": "2020-2021",
		"projectTitle": "material testing  third party audit",
		"fundingAgency": "nagalpalika , pwd, irrigation, mseb, mjp",
		"amount": "960819",
		"duration": 12,
		"considerForAccreditation": "yes",
		"complitionOfAssignment": "no",
		"dateOfCompletion": "2020-06-30",
		"consultancyDocument": "",
		"consulatancyMainId": 1,
		"consultacnyDetailsEmployee$empIds":"[1]",

	}

];



const mockMethods = [
	{
		url: "/:api?/:tenant?/v1/employee/employee_consultancy_industry_details/list",
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
		url: "/:api?/:tenant?/v1/employee/employee_consultancy_industry_details/get/:id?",
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

