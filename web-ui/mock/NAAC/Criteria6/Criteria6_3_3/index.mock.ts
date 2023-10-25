import { MockOptions, defineMock } from 'vite-plugin-mock-dev-server';

const data = [
  {
    "id": 1,
    "academicYear": 2020,
    "professional_details$count": 2,
  },
  {
    "id": 2,
    "academicYear": 2021,
    "professional_details$count": 1,
  }
]

const professionalData = [
  {
    "id": 1,
    "academicYear": 2020,
    "dateFromTo": "2022-04-04 to 2022-06-04",
    "professionalDevelopmentTitle": "ghdjmkse,",
    "administrativeTrainingTitle": "hujmk,l.",
    "numberOfParticipant": "90",
    "document": "1725"
  },

  {
    "id": 2,
    "academicYear": 2020,
    "dateFromTo": "2022-04-04 to 2022-06-04",
    "professionalDevelopmentTitle": "djkm,sd,",
    "administrativeTrainingTitle": "dslm.,l.",
    "numberOfParticipant": "10",
    "document": null
  },

  {
    "id": 3,
    "academicYear": 2021,
    "dateFromTo": "2022-04-04 to 2022-06-04",
    "professionalDevelopmentTitle": "ghdjmkse,",
    "administrativeTrainingTitle": "hujmk,l.",
    "numberOfParticipant": "90",
    "document": null
  }
]

const studentData = [
  {
    id: '1',
    studentBeneiciaryDetails$governmentScheme: '1',
    year: '2018',
    studentInfo$scholarNumber: '181CE11117', // scholar number will be refered as student code
    studentInfo$firstName: 'Snehal',
    studentInfo$middleName: 'Pandurang',
    studentInfo$lastName: 'Shinde',
    studentInfo$programId: '2',
    studentInfo$className: 'first',
  },
  {
    id: '2',
    studentBeneiciaryDetails$governmentScheme: '1',
    year: '2018',
    studentInfo$scholarNumber: '181CE11118', // scholar number will be refered as student code
    studentInfo$firstName: 'SANGITA',
    studentInfo$middleName: 'Shivaji',
    studentInfo$lastName: 'Deshmukh',
    studentInfo$programId: '2',
    studentInfo$className: 'first',
  }
];


const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/NAAC/criteria6/6.3.3/professional/list/:year',
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
    url: '/:api?/:tenant?/v1/NAAC/criteria6/6.3.3/professional/get/:year',
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
  {
    url: '/:api?/:tenant?/v1/NAAC/criteria6/6.3.3/professional/students/get/:year',
    method: 'GET',
    body({ params }) {
      const result = studentData.filter((list: any) => list.academicYear == Number(params.year));
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
