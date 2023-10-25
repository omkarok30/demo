import { MockOptions, defineMock } from 'vite-plugin-mock-dev-server';

const YearwiseData = [
  {
    "id": 1,
    "year": 2020,
    "national_international_exam$count": 2,
    "student_appearing_exam$count": 5,
  },
  {
    "id": 2,
    "year": 2021,
    "national_international_exam$count": 3,
    "student_appearing_exam$count": 6,
  }
]

const examData = [
  {
    "id": 1,
    "academicYear": 2020,
    "registrationNumber": '7328ndjf',
    "studentId": 1,
    "document": null,
    "examDetails": [{ 'net': "10" }, { 'slet': "20" }, { 'gate': "15" }, { 'gmat': '4', }, { 'cat': '8', }, { 'gre': '4', }, { 'jam': '2', }, { 'ielts': '5', }, { 'toefl': '1', }, { 'civilservices': '1', }, { 'stategovexam': '1', }, { 'other': '1', },],
    "student_info$firstName": "Trupti",
    "student_info$middleName": "Lakshman",
    "student_info$lastName": "Doke",

  },
  {
    "id": 2,
    "academicYear": 2021,
    "registrationNumber": '7328ndjf',
    "studentId": 2,
    "document": null,
    "examDetails": [{ 'net': "10" }, { 'slet': "20" }, { 'gate': "15" }, { 'gmat': '4', }, { 'cat': '8', }, { 'gre': '4', }, { 'jam': '2', }, { 'ielts': '5', }, { 'toefl': '1', }, { 'civilservices': '1', }, { 'stategovexam': '1', }, { 'other': '1', },],
    "student_info$firstName": "snehal",
    "student_info$middleName": "pandurang",
    "student_info$lastName": "shinde",
  },
  {
    "id": 3,
    "academicYear": 2021,
    "registrationNumber": 'DDSDSS',
    "studentId": 2,
    "document": null,
    "examDetails": [{ 'net': "10" }, { 'slet': "20" }, { 'gate': "15" }, { 'gmat': '4', }, { 'cat': '8', }, { 'gre': '4', }, { 'jam': '2', }, { 'ielts': '5', }, { 'toefl': '1', }, { 'civilservices': '1', }, { 'stategovexam': '1', }, { 'other': '1', },],
    "student_info$firstName": "AMRUTA",
    "student_info$middleName": "AUDUMBAR",
    "student_info$lastName": "GADADE",
  }

]

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/NAAC/criteria5/5.2.3/NationalInternationalExam/list/:year',
    method: 'GET',
    body({ params }) {
      const result = YearwiseData.filter((list: any) => {
        return list.year <= Number(params.year)
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
    url: '/:api?/:tenant?/v1/NAAC/criteria5/5.2.3/NationalInternationalExam/get/:year',
    method: 'GET',
    body({ params }) {
      const result = examData.filter((list: any) => list.academicYear === Number(params.year));
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
    url: '/:api?/:tenant?/v1/NAAC/criteria5/5.2.3/NationalInternationalExam/students/get/:year',
    method: 'GET',
    body({ params }) {
      const result = examData.filter((list: any) => list.academicYear === Number(params.year));
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
