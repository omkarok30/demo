import { MockOptions, defineMock } from 'vite-plugin-mock-dev-server';

const YearwiseData =
  [
    {
      "id": 1,
      "academicYear": 2020,
      "events$count": "9",
    },
    {
      "id": 2,
      "academicYear": 2021,
      "events$count": "5",
    },
    {
      "id": 3,
      "academicYear": 2019,
      "events$count": "7",
    }
  ]

const culturalEventData = [
  {
    "id": 1,
    "academicYear": 2020,
    "dateOfEvent": '18-01-2023',
    "eventName": 'SINGING',
    "document": "",
    "studentInfo$firstName": "Trupti",
    "studentInfo$middleName": "Lakshman",
    "studentInfo$lastName": "Doke",
  },
  {
    "id": 2,
    "academicYear": 2021,
    "dateOfEvent": '18-01-2023',
    "eventName": 'CRICKET TEAM',
    "document": "",
    "studentInfo$firstName": "MANGESH",
    "studentInfo$middleName": "BHAURAO",
    "studentInfo$lastName": "SABLE",
  },
  {
    "id": 3,
    "academicYear": 2021,
    "dateOfEvent": '18-01-2023',
    "eventName": 'STATE LEVEL CHESS',
    "document": "",
    "studentInfo$firstName": "MANGESH",
    "studentInfo$middleName": "BHAURAO",
    "studentInfo$lastName": "SABLE",
  },
]

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/NAAC/criteria5/5.3.3/culturalEvent/list/:year',
    method: 'GET',
    body({ params }) {
      const result = YearwiseData.filter((list: any) => {
        return list.academicYear <= Number(params.year)
      });
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
    url: '/:api?/:tenant?/v1/NAAC/criteria5/5.3.3/culturalEvent/students/get/:year',
    method: 'GET',
    body({ params }) {
      const result = culturalEventData.filter((list: any) => list.academicYear === Number(params.year));
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
