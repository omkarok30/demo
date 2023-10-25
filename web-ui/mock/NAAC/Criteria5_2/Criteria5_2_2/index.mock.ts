import { MockOptions, defineMock } from 'vite-plugin-mock-dev-server';

const YearwiseData =
  [
    {
			"id": 1,
			"academicYear": 2020,
			"progressing$count": "1",
			"studentPromotionMap$count": "10",
		},
		{
			"id": 2,
			"academicYear": 2021,
			"progressing$count": "3",
			"studentPromotionMap$count": "8",
		},
		{
			"id": 3,
			"academicYear": 2019,
			"progressing$count": "2",
			"studentPromotionMap$count": "4",
		}
  ]

const progressionData = [
  {
    "id": 1,
    "academicYear": 2020,
    "studentInfo$programId": "1",
    "studId": "1",
    "nameOfInstitution": "coe",
    "nameOfProgrammeAdmitted": "computer science",
    "document": "",
    "studentInfo$firstName": "Snehal",
    "studentInfo$middleName": "Pandurang",
    "studentInfo$lastName": "Shinde",

  },
  {
    "id": 2,
    "academicYear": 2021,
    "studentInfo$programId": "3",
    "studId": "1",
    "nameOfInstitution": "coe",
    "nameOfProgrammeAdmitted": "computer science",
    "document": "",
    "studentInfo$firstName": "Snehal",
    "studentInfo$middleName": "Pandurang",
    "studentInfo$lastName": "Shinde",

  },
  {
    "id": 3,
    "academicYear": 2019,
    "studentInfo$programId": "2",
    "studId": "1",
    "nameOfInstitution": "coe",
    "nameOfProgrammeAdmitted": "computer science",
    "document": "",
    "studentInfo$firstName": "Snehal",
    "studentInfo$middleName": "Pandurang",
    "studentInfo$lastName": "Shinde",

  }

]

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/NAAC/criteria5/5.2.2/progression/list/:year',
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
    url: '/:api?/:tenant?/v1/NAAC/criteria5/5.2.2/progression/get/:year',
    method: 'GET',
    body({ params }) {
      const result = progressionData.filter((list: any) => list.academicYear === Number(params.year));
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
    url: '/:api?/:tenant?/v1/NAAC/criteria5/5.2.2/progression/students/get/:year',
    method: 'GET',
    body({ params }) {
      const result = progressionData.filter((list: any) => list.academicYear  === Number(params.year));
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
