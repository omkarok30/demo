import _ from 'lodash';
import { MockOptions, defineMock } from 'vite-plugin-mock-dev-server';

const data = [
  {
    id: 1,
    academicYear: 2022,
    options: 'B',
    criteriaNumber: '5.1.3',
  },
  {
    id: 2,
    academicYear: 2021,
    options: 'A',
    criteriaNumber: '5.1.5',
  },
  {
    id: 3,
    academicYear: 2021,
    options: 'B',
    criteriaNumber: '6.2.3',
  },
  {
    id: 4,
    academicYear: 2021,
    options: 'B',
    criteriaNumber: '6.5.3',
  },
];

const QualityData = [
		{
			"id": 1,
			"capacity_development": "2022-23",
			"dateFrmoTo": "2022-04-05 to 2022-09-10",
			"otherQualityAudit": "31",
			"collaborativeQuality": "1",
			"participationInNirf": "2",
			"regularMeetings": "abcs",
			"conferenceSeminar": "njmk,lddsn,m ",
			"academicYear": 2022
		},{
			"id": 3,
			"capacity_development": "2022-23",
			"dateFrmoTo": "2022-04-05 to 2022-09-10",
			"otherQualityAudit": "31",
			"collaborativeQuality": "1",
			"participationInNirf": "2",
			"regularMeetings": "abcs",
			"conferenceSeminar": "njmk,lddsn,m ",
			"academicYear": 2022
		},
    {
			"id": 4,
			"capacity_development": "2021-22",
			"dateFrmoTo": "2021-04-05 to 2021-09-10",
			"otherQualityAudit": "31",
			"collaborativeQuality": "1",
			"participationInNirf": "2",
			"regularMeetings": "abcs",
			"conferenceSeminar": "njmk,lddsn,m ",
			"academicYear": 2021
		},
    {
			"id": 5,
			"capacity_development": "2020-21",
			"dateFrmoTo": "2020-04-05 to 2020-09-10",
			"otherQualityAudit": "31",
			"collaborativeQuality": "1",
			"participationInNirf": "2",
			"regularMeetings": "abcs",
			"conferenceSeminar": "njmk,lddsn,m ",
			"academicYear": 2020
		}
	]

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/NAAC/criteria6/6.5.3/list',
    method: 'GET',
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
    url: '/:api?/:tenant?/v1/NAAC/criteria6/6.5.3/get/:year',
    method: 'GET',
    body({ params }) {
      const result = _.find(data, { academicYear: Number(params.year) });
      return {
        code: 200,
        data: {
          records: result,
        },
      };
    },
  },
  {
    url: '/:api?/:tenant?/v1/NAAC/criteria6/6.5.3/edit/:year',
    method: 'POST',
    body(req) {
      const { option } = req.body
      const params = req.params
      const result = data.map((list) => list.academicYear === Number(params.year) ? { ...list, options: option } : list);
      return {
        code: 200,
        data: {
          records: result,
        },
      };
    },
  },
  {
    url: '/:api?/:tenant?/v1/NAAC/criteria6/6.5.3/getArea/:year',
    method: 'GET',
    body(req) {
      const params = req.params
      const result = QualityData.filter((list) => list.academicYear === Number(params.year));
      console.log(result)

      return {
        code: 200,
        data: {
          records: result,
        },
      };
    },
  },
] as MockOptions;

export default defineMock(mockMethods);
