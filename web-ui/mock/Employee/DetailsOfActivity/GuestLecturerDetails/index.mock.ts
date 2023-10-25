import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const data = [
	{
		"id": "1",
		"empId": 1,
		"organization": "SVEri's college of engineering (poly) pandharpur",
		"subject": "improving lsrw skills",
		"lectureDuration": 2,
		"date": "2020-06-29",
		"document": ""
	},
	{
		"id": "2",
		"empId": 1,
		"organization": "Basavakalyan engineering college basavakalyan",
		"subject": "digital signal processing",
		"lectureDuration": 8,
		"date": "2017-11-11",
		"document": ""
	},
	{
		"id": "3",
		"empId": 2,
		"organization": "VVP, Institute of engineers and technology",
		"subject": "Antenna theory and design for M E (ENTC)",
		"lectureDuration": 4,
		"date": "2020-07-25",
		"document": ""
	}
];



const mockMethods = [
	{
		url: "/:api?/:tenant?/v1/employee/employee_guest_lecturer_details/list",
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
		url: "/:api?/:tenant?/v1/employee/employee_guest_lecturer_details/get/:id?",
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

