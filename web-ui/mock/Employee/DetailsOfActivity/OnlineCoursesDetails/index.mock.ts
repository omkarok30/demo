import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const data=
	[
		{
			"id": "1",
			'userId':1,
			"academicYear": 2020,
			"courseName": "dxcfgvbh",
			"courseDuration": "3",
			"mode": "online",
			"startDate": "2020-02-28",
			"endDate": "2020-03-09",
			"uploadDocument": "",
			"fees": "4000",
			"organizationName": "cfgvhb",
			"relevantPo": "NA",
			"financialSupport": "no",
			"program": "NA"
		},
		{
			"id": "2",
			'userId':2,
			"academicYear": 2021,
			"courseName": "react",
			"courseDuration": "1",
			"mode": "offline",
			"startDate": "2021-02-28",
			"endDate": "2021-03-09",
			"uploadDocument": "",
			"fees": "4000",
			"organizationName": "qspider",
			"relevantPo": "NA",
			"financialSupport": "no",
			"program": "NA"
		}
	]


const mockMethods = [
	{
	  url: "/:api?/:tenant?/v1/employee/employee_online_courses_details/list",
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
	  url: "/:api?/:tenant?/v1/employee/employee_online_courses_details/get/:id?",
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
  