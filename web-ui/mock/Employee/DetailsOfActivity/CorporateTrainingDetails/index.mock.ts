import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const data = [
	{
		"id": "1",
		"empId": 1,
		"academicYear": "2019-2020",
		"trainingProgramName": "xyz",
		"sponsoringAgency": "sdddsds",
		"revenueGenerated": "3000",
		"duration": 4,
		"consultancyDocument": "0",
		"corporateMainId": 1,
		"numberOfTrainees": 5,
		"corporateDetailsEmployee$empIds":"[2]"
	},
	{
		"id": "2",
		"empId": 2,
		"academicYear": "2020-2021",
		"trainingProgramName": "xyz",
		"sponsoringAgency": "sdddsds",
		"revenueGenerated": "3000",
		"duration": 4,
		"consultancyDocument": "0",
		"corporateMainId": 1,
		"numberOfTrainees": 4,
		"corporateDetailsEmployee$empIds":"[1]"

	}

];




const mockMethods = [
	{
		url: "/:api?/:tenant?/v1/employee/employee_corporate_training_details/list",
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
		url: "/:api?/:tenant?/v1/employee/employee_corporate_training_details/get/:id?",
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

