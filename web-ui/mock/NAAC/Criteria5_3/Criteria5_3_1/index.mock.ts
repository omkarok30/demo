import { MockOptions, defineMock } from 'vite-plugin-mock-dev-server';

const YearwiseData =
  [
    {
      "id": 1,
      "academicYear": 2020,
      "award$count": "9",
    },
    {
      "id": 2,
      "academicYear": 2021,
      "award$count": "5",
    },
    {
      "id": 3,
      "academicYear": 2019,
      "award$count": "7",
    }
  ]

const awardData = [
  {
    "id": 1,
    "academicYear": 2020,
    "studId": "1",
    "awardName": "CRICKET TEAM",
    "teamIndividual": "TEAM",
    "awardLevel": "INSTITUTE LEVEL",
    "activityType": "SPORTS",
    "document": "",
    "studentInfo$firstName": "Trupti",
    "studentInfo$middleName": "Lakshman",
    "studentInfo$lastName": "Doke",
  },
  {
    "id": 2,
    "academicYear": 2021,
    "studId": "2",
    "awardName": "STATE LEVEL CHESS",
    "teamIndividual": "INDIVIDUAL",
    "awardLevel": "INTERNATIONAL LEVEL",
    "activityType": "SPORTS",
    "document": "",
    "studentInfo$firstName": "MANGESH",
    "studentInfo$middleName": "BHAURAO",
    "studentInfo$lastName": "SABLE",
  },
  {
    "id": 3,
    "academicYear": 2021,
    "studId": "2",
    "awardName": "STATE LEVEL CHESS",
    "teamIndividual": "INDIVIDUAL",
    "awardLevel": "INTERNATIONAL LEVEL",
    "activityType": "SPORTS",
    "document": "",
    "studentInfo$firstName": "MANGESH",
    "studentInfo$middleName": "BHAURAO",
    "studentInfo$lastName": "SABLE",
  },
]

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/NAAC/criteria5/5.3.1/award/list/:year',
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
    url: '/:api?/:tenant?/v1/NAAC/criteria5/5.3.1/award/students/get/:year',
    method: 'GET',
    body({ params }) {
      const result = awardData.filter((list: any) => list.academicYear === Number(params.year));
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
