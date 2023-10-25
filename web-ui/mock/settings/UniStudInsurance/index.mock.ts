import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/settings/uni-stud-insurance/list',
    method: 'GET',
    body({ body }) {
      return {
        code: 200,
        data: [
          {
            "key": 1,
            "id": 1,
            "year": "2020-21",
            "degree_level": "UG",
            "program": "UG in Civil Engineering",
            "unifee_structure": "demo 1",
            "student_insurance": "Health Insurance"
          },
          {
            "key": 2,
            "id": 2,
            "year": "2020-21",
            "degree_level": "UG",
            "program": "UG in Electrical Engineering",
            "unifee_structure": "demo 2",
            "student_insurance": "Disability Insurance"
          },
          {
            "key": 3,
            "id": 3,
            "year": "2021-22",
            "degree_level": "UG",
            "program": "UG in Computer Engineering",
            "unifee_structure": "demo 2",
            "student_insurance": "Disability Insurance"
          },
          {
            "key": 4,
            "id": 4,
            "year": "2021-22",
            "degree_level": "PG",
            "program": "Post Graduation in Computer Engineering",
            "unifee_structure": "demo 2",
            "student_insurance": "health Insurance"
          },
          {
            "key": 5,
            "id": 5,
            "year": "2021-22",
            "degree_level": "PG",
            "program": "PG in Electrical Engineering",
            "unifee_structure": "demo 1",
            "student_insurance": "Disability Insurance"
          },
          {
            "key": 6,
            "id": 6,
            "year": "2020-21",
            "degree_level": "Diploma",
            "program": "Diploma in Civil Engineering",
            "unifee_structure": "demo 2",
            "student_insurance": "Disability Insurance"
          },
          {
            "key": 7,
            "id": 7,
            "year": "2019-20",
            "degree_level": "Diploma",
            "program": "Diploma in Civil Engineering",
            "unifee_structure": "demo 2",
            "student_insurance": "Health Insurance"
          }
        ],
      };
    },
  },
  {
    url: '/:api?/:tenant?/v1/settings/uni-stud-insurance/degreelevels',
    method: 'GET',
    body({ body }) {
      return {
        code: 200,
        data: [
          {
            "key": 1,
            "id": 1,
            "degree_level": "Diploma",
            "title": "Diploma"
          },
          {
            "key": 2,
            "id": 2,
            "degree_level": "UG",
            "title": "Under Graduation"
          },
          {
            "key": 3,
            "id": 3,
            "degree_level": "PG",
            "title": "Post Graduation"
          }
        ],
      };
    },
  },
  {
    url: '/:api?/:tenant?/v1/settings/uni-stud-insurance/academicyear',
    method: 'GET',
    body({ body }) {
      return {
        code: 200,
        data: [
          {
            "key": 1,
            "id": 1,
            "aYear": "2011-12",
            "aytype": "Type A"
          },
          {
            "key": 2,
            "id": 2,
            "aYear": "2012-13",
            "aytype": "Type A"
          },
          {
            "key": 3,
            "id": 3,
            "aYear": "2013-14",
            "aytype": "Type A"
          },
          {
            "key": 4,
            "id": 4,
            "aYear": "2014-15",
            "aytype": "Type B"
          },
          {
            "key": 5,
            "id": 5,
            "aYear": "2015-16",
            "aytype": "Type B"
          },
          {
            "key": 6,
            "id": 6,
            "aYear": "2020-21",
            "aytype": "Type B"
          },
          {
            "key": 6,
            "id": 6,
            "aYear": "2021-22",
            "aytype": "Type B"
          }
        ],
      };
    },
  },
] as MockOptions;

export default defineMock(mockMethods);
