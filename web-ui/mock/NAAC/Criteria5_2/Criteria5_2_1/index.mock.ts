import { MockOptions, defineMock } from 'vite-plugin-mock-dev-server';

const YearwiseData =
  [
    {
      "id": 1,
      "academicYear": 2020,
      "placement$count": "1",
      "studentPromotionMap$count": "10",
    },
    {
      "id": 2,
      "academicYear": 2021,
      "placement$count": "3",
      "studentPromotionMap$count": "8",
    },
    {
      "id": 3,
      "academicYear": 2019,
      "placement$count": "2",
      "studentPromotionMap$count": "4",
    }
  ]

const placementData = [
  {
    "id": 1,
    "academicYear": 2020,
    "studId": "1",
    "studentInfo$programId": "1",
    "nameOfEmployer": "Trupti",
    "package": "3",
    "document": "",
    "studentInfo$firstName": "Trupti",
    "studentInfo$middleName": "Lakshman",
    "studentInfo$lastName": "Doke",
  },
  {
    "id": 2,
    "academicYear": 2021,
    "studId": "1",
    "studentInfo$programId": "1",
    "nameOfEmployer": "Trupti",
    "package": "3",
    "document": "",
    "studentInfo$firstName": "Trupti",
    "studentInfo$middleName": "Lakshman",
    "studentInfo$lastName": "Doke",
  },

]

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/NAAC/criteria5/5.2.1/placement/list/:year',
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
    url: '/:api?/:tenant?/v1/NAAC/criteria5/5.2.1/placement/get/:year',
    method: 'GET',
    body({ params }) {
      const result = placementData.filter((list: any) => list.academicYear === Number(params.year));
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
    url: '/:api?/:tenant?/v1/NAAC/criteria5/5.2.1/placement/students/get/:year',
    method: 'GET',
    body({ params }) {
      const result = placementData.filter((list: any) => list.academicYear  === Number(params.year));
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
