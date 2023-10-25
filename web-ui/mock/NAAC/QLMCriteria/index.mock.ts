import { MockOptions, defineMock } from 'vite-plugin-mock-dev-server';

const data = [
  {
    "id": 1,
    "academicYear": "2020",
    "text": "abcdefg",
    "assessmentType": "aqar",
    "criteriaNumber": '1.1.1'
  },
  {
    "id": 2,
    "academicYear": "2020",
    "text": "*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 characters and within 500 words.*At least 100 character",
    "assessmentType": "aqar",
    "criteriaNumber": '1.1.2'
  },
  {
    "id": 3,
    "academicYear": "2021",
    "text": "abcdefgr",
    "assessmentType": "aqar",
    "criteriaNumber": '1.3.1'
  },
  {
    "id": 4,
    "academicYear": "2022",
    "text": "demo for AQAR 2",
    "assessmentType": "aqar",
    "criteriaNumber": '2.2.1'
  },
  {
    "id": 5,
    "academicYear": "2022",
    "text": "demo for AQAR 2.3.1",
    "assessmentType": "aqar",
    "criteriaNumber": '2.3.1'
  },
  {
    "id": 6,
    "academicYear": "2022",
    "text": "demo for AQAR 2.3.2",
    "assessmentType": "aqar",
    "criteriaNumber": '2.3.2'
  },
  {
    "id": 7,
    "academicYear": "2022",
    "text": "demo for AQAR 2.5.1",
    "assessmentType": "aqar",
    "criteriaNumber": '2.5.1'
  },
  {
    "id": 8,
    "academicYear": "2022",
    "text": "demo for AQAR 2.5.2",
    "assessmentType": "aqar",
    "criteriaNumber": '2.5.2'
  },
  {
    "id": 9,
    "academicYear": "2022",
    "text": "demo for AQAR 2.6.1",
    "assessmentType": "aqar",
    "criteriaNumber": '2.6.1'
  },
  {
    "id": 10,
    "academicYear": "2022",
    "text": "demo for AQAR 2.6.2",
    "assessmentType": "aqar",
    "criteriaNumber": '2.6.2'
  },
  {
    "id": 11,
    "academicYear": "2022",
    "text": "demo for AQAR 3.2.1",
    "assessmentType": "aqar",
    "criteriaNumber": '3.2.1'
  },
  {
    "id": 12,
    "academicYear": "2022",
    "text": "demo for AQAR 3.4.1",
    "assessmentType": "aqar",
    "criteriaNumber": '3.4.1'
  }
]

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/NAAC/QLMCriteria/:year',
    method: 'GET',
    body({ params }) {
      const result = data.filter((item: any) => item.academicYear === params.year)
      return {
        code: 200,
        data: {
          total: data.length,
          records: result,
        },
      };
    },
  },
  {
    url: '/:api?/:tenant?/v1/NAAC/QLMCriteria/:year/:id/:criteria',
    method: 'POST',
    body({ params }) {
      const result = data.filter((list: any) => list.yearAt == params.year);
      return {
        code: 200,
        data: {
          total: result.length,
          records: result,
        },
      };
    },
  }
] as MockOptions;
export default defineMock(mockMethods);