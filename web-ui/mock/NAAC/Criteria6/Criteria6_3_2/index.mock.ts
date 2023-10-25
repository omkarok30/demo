import { MockOptions, defineMock } from 'vite-plugin-mock-dev-server';

const data = [
  {
    "id": 1,
    "academicYear": 2020,
    "professional_details$count": 2,
    "faculty_fulltime$count": 28,
  },
  {
    "id": 2,
    "academicYear": 2021,
    "professional_details$count": 4,
    "faculty_fulltime$count": 49,
  }
]

const professionalData = [
  {
    "id": 1,
    "academicYear": 2020,
    "employee_sttp_details$empId": "1",
    "employee_info$firstName": "Trupti",
    "employee_info$middleName": "Lakshman",
    "employee_info$lastName": "Doke",
    "employee_sttp_details$programDetails": "svgbhnjms",
    "employee_sttp_details$workshop": "",
    "employee_sttp_details$startDate": "2021-02-23",
    "employee_sttp_details$endDate": "2021-02-28",
    "document": null,
    "amount": 410000,
  },
  {
    "id": 2,
    "academicYear": 2021,
    "employee_sttp_details$empId": "1",
    "employee_info$firstName": "Trupti",
    "employee_info$middleName": "Lakshman",
    "employee_info$lastName": "Doke",
    "employee_sttp_details$programDetails": "svgbhnjms",
    "employee_sttp_details$workshop": "",
    "employee_sttp_details$startDate": "2021-02-23",
    "employee_sttp_details$endDate": "2021-02-28",
    "document": 'ABC',
    "amount": 55225,
  },
]

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/NAAC/criteria6/6.3.2/financialReport/list/:year',
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
    url: '/:api?/:tenant?/v1/NAAC/criteria6/6.3.2/financialReport/get/:year',
    method: 'GET',
    body({ params }) {
      const result = professionalData.filter((list: any) => list.academicYear == Number(params.year));
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
