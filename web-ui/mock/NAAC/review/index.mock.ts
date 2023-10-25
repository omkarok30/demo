import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';
import _ from 'lodash';
import { size } from 'lodash';

const data =
  [
    {
      "id": 1,
      "criteriaNumber": "1.1.1",
      "reviewNumber": 0,
      "academicYear": 2022,
      "userId": "1",
      "selfEvaluationScore": 2,
      "reviewerId": 2,
      "reviewerScore": "1",
      "comment": "hjnmksd",
      "status": "drafted",
      "reviewStatus": "firsttimeevaluated",
      "makersComment": "ssdxsdd",
      "reviewType": 'internal',
      "reviewDate": "2021-04-29",
      "assessmentType": "aqar"
    },
    {
      "id": 2,
      "criteriaNumber": "1.1.1",
      "reviewNumber": 0,
      "academicYear": 2021,
      "userId": "1",
      "selfEvaluationScore": 2,
      "reviewerId": 1,
      "reviewerScore": "1",
      "comment": "hjnmksd",
      "status": "drafted",
      "reviewStatus": "firsttimeevaluated",
      "makersComment": "ssdxsdd",
      "reviewType": 'External',
      "reviewDate": "2021-04-29",
      "assessmentType": "aqar"
    },
    {
      "id": 3,
      "criteriaNumber": "1.1.2",
      "reviewNumber": 0,
      "academicYear": 2022,
      "userId": "2",
      "selfEvaluationScore": 2,
      "reviewerId": 1,
      "reviewerScore": "2",
      "comment": "dasfsffssfsf",
      "status": "selfevaluated",
      "reviewStatus": "firsttimeevaluated",
      "makersComment": "dcd",
      "reviewType": null,
      "reviewDate": "2021 - 04 - 29",
      "assessmentType": "aqar"
    },
    {
      "id": 4,
      "criteriaNumber": "1.1.2",
      "reviewNumber": 2,
      "academicYear": 2022,
      "userId": "2",
      "selfEvaluationScore": 2,
      "reviewerId": 0,
      "reviewerScore": "2",
      "comment": "dasfsffssfsf",
      "status": "selfevaluated",
      "reviewStatus": "firsttimeevaluated",
      "makersComment": "dcd",
      "reviewType": null,
      "reviewDate": "2021 - 04 - 29",
      "assessmentType": "aqar"
    },

  ]

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/naac/aqar/review/list/:criteria',
    method: 'GET',
    body({ params }) {
      const filterData = data.filter(item => item.criteriaNumber === params.criteria)
      return {
        code: 200,
        data: {
          total: filterData.length,
          records: filterData,
        }
      };
    },
  },
  {
    url: '/:api?/:tenant?/v1/naac/aqar/review/get/:id?',
    method: 'GET',
    body({ params }) {

      const rec = _.find(data, { id: params.id });
      console.log(rec);

      return {
        code: 200,
        data: {
          total: size(rec),
          records: rec,
        }
      }
    },
  },
  {
    url: '/:api?/:tenant?/v1/naac/aqar/review/saveDraft/:id',
    method: 'POST',
    body({ params }) {

      const rec = _.find(data, { id: params.id });
      console.log(rec);

      return {
        code: 200,
        data: {
          total: size(rec),
          records: rec,
        }
      }
    },
  },
] as MockOptions;

export default defineMock(mockMethods);

