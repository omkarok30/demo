import { MockOptions, defineMock } from 'vite-plugin-mock-dev-server';

const data = [
  {
    "id": 1,
    "academicYear": 2020,
    "funds_details$count": "1",
  },
  {
    "id": 1,
    "academicYear": 2021,
    "funds_details$count": "2",
  },
  {
    "id": 1,
    "academicYear": 2022,
    "funds_details$count": "3",
  },
  {
    "id": 1,
    "academicYear": 2023,
    "funds_details$count": "1",
  },
]

const fundsData = [
  {
    "id": 1,
    "academicYear": 2020,
    "nameOfFundingAgency": "sveri",
    "purposeOfGrant": "shjmk,ld.s",
    "fundsReceived": "3",
    "link": 'gmail.com'
  },
  {
    "id": 2,
    "academicYear": 2021,
    "nameOfFundingAgency": "xhnjm,",
    "purposeOfGrant": "shjmk,ld.s",
    "fundsReceived": "3",
    "link": 'gmail.com'
  },
  {
    "id": 3,
    "academicYear": 2021,
    "nameOfFundingAgency": "xhnjm,",
    "purposeOfGrant": "shjmk,dasd.s",
    "fundsReceived": "4",
    "link": 'sdf.com'
  },
]

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/NAAC/criteria6/6.4.1/FundsGrants/list/:year',
    method: 'GET',
    body({ params }) {
      const result = data.filter((list: any) => list.academicYear <= Number(params.year));
      return {
        code: 200,
        data: {
          total: result.length,
          records: result,
        },
      };
    },
  },
  {
    url: '/:api?/:tenant?/v1/NAAC/criteria6/6.4.1/FundsGrants/get/:year',
    method: 'GET',
    body({ params }) {
      const result = fundsData.filter((list: any) => list.academicYear == Number(params.year));
      return {
        code: 200,
        data: {
          total: result.length,
          records: result,
        },
      };
    },
  },
] as MockOptions;

export default defineMock(mockMethods);
