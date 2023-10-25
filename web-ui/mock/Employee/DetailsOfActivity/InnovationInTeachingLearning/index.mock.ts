import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const data = [
	{
		"id": "1",
		"empId": 1,
		"year": 2019,
		"title": "google classroom",
		"description": "created google classroom for subject DATA STRUCTURE",
		"uploadDocument": ""
	},
	{
		"id": "2",
		"empId": 1,
		"year": 2020,
		"title": "use of flow chart for solving mcqs on lines",
		"description": "mcqs of lines need more thought process for solving. to ssummarize this process, flow charts have  been prepared.",
		"uploadDocument": ""
	},
	{
		"id": "3",
		"empId": 2,
		"year": 2021,
		"title": "GOOGLE CLASSROOM",
		"description": "GOOGLE CLASSROOM CREATED FOR UPLOADING PROGRAMS,ASSIGNMENT OR ANY LAB WORK.",
		"uploadDocument": ""
	}
];



const mockMethods = [
	{
		url: "/:api?/:tenant?/v1/employee/employee_innovation_in_teaching_learning/list",
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
		url: "/:api?/:tenant?/v1/employee/employee_innovation_in_teaching_learning/get/:id?",
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
