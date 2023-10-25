import { defineMock, MockOptions } from "vite-plugin-mock-dev-server";
import _ from "lodash";
import { size } from "lodash";

const data = [
    {
        "id": "1",
        "empId": "1",
        "qualityOfPaper": "scopusconference",
        "authorName": "Anil Bhagawan Shinde, Prashant Maruti Pawar,  Sunil Suryakant Gaikwad, Yashpal Khedkar",
        "paperTitle": "Analysis of Water Lubricated Bearing with Different Features to Improve the Performance: Green Tribology",
        "conferenceDetails": "TECHNOSOCIETAL -2016",
        "publicationDate": "2018-01-01",
        "sciImpactFactor": "NIL",
        "certificateDocument": "435",
        "considerForAccreditation": "no",
        "financialSupportProvided": "no",
        "amount": 0,
        "conferenceTitle": "Techno-Societal 2016, International Conference on Advanced Technologies for Societal Applications",
        "linkToJournal": "https://link.springer.com/book/10.1007/978-3-319-53556-2",
        "levelOfConference": "national",
        "journalNotified": "no",
        "doiNumber": "DOI: 10.1007/978-3-319-53556-2_78",
        "isbnNumber": "ISBN: 978-3-319-53556-2",
        "onlineLink": "https://link.springer.com/chapter/10.1007/978-3-319-53556-2_78"
    },
    {
        "id": "2",
        "empId": "1",
        "qualityOfPaper": "otherjournal",
        "authorName": "Yashpal Khedkar ",
        "paperTitle": "Manufacturing and Testing of Cantilever beam by using Magnetorheological approach",
        "conferenceDetails": "International Journal of Innovations in Engineering and Technology (IJIET) ",
        "publicationDate": "2020-07-11",
        "sciImpactFactor": "0.672",
        "certificateDocument": "440",
        "considerForAccreditation": "yes",
        "financialSupportProvided": "no",
        "amount": 0,
        "conferenceTitle": "International Journal of Innovations in Engineering and Technology (IJIET)",
        "linkToJournal": "https://ijiet.com/",
        "levelOfConference": "national",
        "journalNotified": "no",
        "doiNumber": "",
        "isbnNumber": " ISSN: 2319 â€“ 1058",
        "onlineLink": "https://ijiet.com/issues/volume-7-issue-1-june-2016/"
    },
    {
        "id": "3",
        "empId": "2",
        "qualityOfPaper": "otherjournal",
        "authorName": "L. B .Raut , Y.M. Khedkar , S.Y. Salunke.  S.V. Jadhav ",
        "paperTitle": "Modification of Classical Hydraulic damper into Semi active damper using MR Approach",
        "conferenceDetails": "International Journal of Scientific and Research Publications",
        "publicationDate": "2010-03-01",
        "sciImpactFactor": "no",
        "certificateDocument": "444",
        "considerForAccreditation": "yes",
        "financialSupportProvided": "no",
        "amount": 0,
        "conferenceTitle": "International Journal of Scientific and Research Publications",
        "linkToJournal": "http://www.ijsrp.org/",
        "levelOfConference": "",
        "journalNotified": "no",
        "doiNumber": "DOI: 10.29322/IJSRP.9.03.2019.p8795 ",
        "isbnNumber": "ISSN 2250-3153",
        "onlineLink": "http://www.ijsrp.org/research-paper-0319.php?rp=P878406"
    },

];



const mockMethods = [
	{
	  url: "/:api?/:tenant?/v1/employee/employee_publication_details/list",
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
	  url: "/:api?/:tenant?/v1/employee/employee_publication_details/get/:id?",
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
  