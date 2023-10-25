import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const data = [
	{
		"id": "1",
		"empId": 1,
		"academicYear": 2020,
		"levelOfprogram": "UG",
		"programId": 3,
		"courseName": "Artificial Intelligence and application, data",
		"considerForAccrediation": "yes",
		"certificateDocument": ""
	},
	{
		"id": "2",
		"empId": 2,
		"academicYear": 2019,
		"levelOfprogram": "diploma",
		"programId": 2,
		"courseName": "b.e. E&TC CURRICULUM SETTING AND B.TECH STRUC",
		"considerForAccrediation": "yes",
		"certificateDocument": ""
	}
];




const mockMethods = [
	{
		url: "/:api?/:tenant?/v1/employee/employee_design_development/list",
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
		url: "/:api?/:tenant?/v1/employee/employee_design_development/get/:id?",
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

