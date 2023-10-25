import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";


const data = [
    {
        "id": "1",
        "empId": "1",
        "publicationYear": "2019",
        "authorName": "supriya shegdar",
        "bookName": "intelligent keyboard for hindi devnagari script",
        "isbn": "978-3-659-77273-3",
        "considerForAccreditation": "no",
        "onlineLink": "https://docs.google.com/document/d/150--tNvop_8AKitnGdVr80Rrv4effqjL2S8lAd3kTeo/edit",
        "nameOfPublisher": null
    },
    {
        "id": "2",
        "empId": "2",
        "publicationYear": "2019",
        "authorName": "ganesh gopalrao patil",
        "bookName": "selective encryption algorithm for messages in wireless ad-hoc networks",
        "isbn": "978-3-659-93317-2",
        "considerForAccreditation": "yes",
        "onlineLink": null,
        "nameOfPublisher": null
    },
    {
        "id": "3",
        "empId": "1",
        "publicationYear": "2020",
        "authorName": "PRASHANT PAWAR AND RANJAN GANGULI",
        "bookName": "Structural Health Monitoring using Genetic Fuzzy System, Springer, U. K. 2011.",
        "isbn": "978-0-85729-907-9",
        "considerForAccreditation": "yes",
        "onlineLink": "https://link.springer.com/book/10.1007/978-0-85729-907-9",
        "nameOfPublisher": "Springer Nature Switzerland AG"
    }
];



const mockMethods = [
	{
	  url: "/:api?/:tenant?/v1/employee/employee_book_details/list",
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
	  url: "/:api?/:tenant?/v1/employee/employee_book_details/get/:id?",
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
  