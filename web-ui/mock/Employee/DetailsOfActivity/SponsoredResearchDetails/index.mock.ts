import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const data = [
	{
		"id": "1",
		"empId": 1,
		"academicYear": "2020-2021",
		"projectTitle": "Structural Health Monitoring of Composite Rotor Blades under Uncertainties",
		"fundingAgency": "Aeronautics R& D Board, Govt. Of India, New Delhi",
		"santionedAmount": "12",
		"duration": 24,
		"certificateDocument": "0",
		"considerForAccreditation": 1,
		"nameOfPrincipalInvestigator": "Trupti Lakshman Doke",
		"sanctionDate": "2022-10-05",
		"fundingAgencyType": "government",
		"sponseredMainId": 1,
		"sponseredResearchEmployee$empIds":"[2]"
	},
	{
		"id": "2",
		"empId": "1",
		"academicYear": "2019-2020",
		"projectTitle": "Setting up Rural Human Resource Development Facility (RHRDF) with the technical guidance and consultancy from BARC-DAE",
		"fundingAgency": "Rajiv Gandhi Science and Technology Commission, Govt. of Maharashtra, Mumbai",
		"santionedAmount": "318",
		"duration": 36,
		"certificateDocument": "0",
		"considerForAccreditation": 1,
		"nameOfPrincipalInvestigator": "Trupti Lakshman Doke",
		"sanctionDate": "2022-06-03",
		"fundingAgencyType": "nongovernment",
		"sponseredMainId": 2,
		"sponseredResearchEmployee$empIds":"[2]"

	},
	{
		"id": "3",
		"empId": "2",
		"academicYear": "2020-2021",
		"projectTitle": "DESIGN ANALYSIS FOR IMPROVEMENT OF MANUFACTURING PROCESS FOR MINIMIZING FAILURE MODES OF CHAIN ASSEMBLY",
		"fundingAgency": "RAJIV GANDHI SCIENCE AND TECHNOLOGY COMMISSION",
		"santionedAmount": "15",
		"duration": 36,
		"certificateDocument": "574",
		"considerForAccreditation": 1,
		"nameOfPrincipalInvestigator": "Trupti Lakshman Doke",
		"sanctionDate": "2022-02-03",
		"fundingAgencyType": "government",
		"sponseredMainId": 3,
		"sponseredResearchEmployee$empIds":"[1]"

	}

];


const mockMethods = [
	{
		url: "/:api?/:tenant?/v1/employee/employee_sponsored_research_details/list",
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
		url: "/:api?/:tenant?/v1/employee/employee_sponsored_research_details/get/:id?",
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
