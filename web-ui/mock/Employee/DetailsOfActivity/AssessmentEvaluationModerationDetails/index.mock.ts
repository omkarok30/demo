import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const data =
	[
		{
			"id": "1",
			"empId": 1,
			"academicYear": 2019,
			"type": "assessment",
			"levelOfProgram": "ug",
			"courseName": "Electronics and telecommunication Engineering",
			"certificateDocument": ""
		},
		{
			"id": "2",
			"empId": 1,
			"academicYear": 2020,
			"type": "evaluation",
			"levelOfProgram": "diploma",
			"courseName": "Mobile Application development",
			"certificateDocument": ""
		},
		{
			"id": "3",
			"empId": 1,
			"academicYear": 2019,
			"type": "moderation",
			"levelOfProgram": "ug",
			"courseName": "Computer organization",
			"certificateDocument": ""
		}
	]


const mockMethods = [
	{
		url: "/:api?/:tenant?/v1/employee/employee_assessment_evaluation_moderation/list",
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
		url: "/:api?/:tenant?/v1/employee/employee_assessment_evaluation_moderation/get/:id?",
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
