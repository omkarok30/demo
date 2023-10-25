import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const data = [
	{
		id: "1",
		studentId: "1",
		academicYear: "2021",
		eventLevel: "department",
		participationType: "withinState",
		activityName: "First Activity",
		venuePlaceOfActivity: "Mumbai",
		activityDetails: "Details",
		organizingCollaboratingAgency: "Yes",
		otherOrganizingCollaboratingAgencyName: "Talent A",
		dateOfEvent: "12-07-2020", // Date of Participation
		achievement: "firstPrice",
		relevantPo: "test technical knowledge",
		relevantCo: "",
		linkToActivityDocs: "path_to_com",
		activityImageUpload: "image",
		document: "link",
	}
];


const mockMethods = [
	{
	  url: "/:api?/:tenant?/v1/employee/employee_extention_activity_details/list",
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
	  url: "/:api?/:tenant?/v1/employee/employee_extention_activity_details/get/:id?",
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
  
