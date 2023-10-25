import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const data = [
	{
		"id": "1",
		"empId": 1,
		"academicYear": 2019,
		"developmentType": "product",
		"productName": "Onion Boring machine",
		"additionalInformationDocument": "936",
		"description": "This machine made mainly for onion planting purrelevantPose. A survey has been conducted from\r\nfarmers about problem faced by farmers in agriculture. One of the significant problems observed\r\nrelated to Onion",
		"relevantPo": "NA",
		"facultyInvolved":"Trupti Lakshman Doke",
		"programId": "Diploma in Computer Engineering",
		"considerForAccreditation": "no",
		"otherPeople": "Trupti Lakshman Doke",
		"developmentMainId": 2,
		"developmentActivityEmployee$empIds":"[2]",
	},
	{
		"id": "2",
		"empId": 2,
		"academicYear": 2020,
		"developmentType": "research",
		"productName": "Hybrid E-Bicycle",
		"additionalInformationDocument": "",
		"description": "The energy demand in the world is continuously increasing due the modernization and\r\nthe fossil fuels will not be a permanent solution for this issue. Also, the relevantPollution is a crucial\r\nissue due to us",
		"relevantPo": "NA",
		"facultyInvolved":"Trupti Lakshman Doke",
		"programId": "Diploma in Pharmacy",
		"considerForAccreditation": "yes",
		"otherPeople": "Puja Lakshman Chavan",
		"developmentMainId": 2,
		"developmentActivityEmployee$empIds":"[1]",

	}
];



const mockMethods = [
	{
		url: "/:api?/:tenant?/v1/employee/employee_development_activity_details/list",
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
		url: "/:api?/:tenant?/v1/employee/employee_development_activity_details/get/:id?",
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

