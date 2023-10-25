import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';
import _ from 'lodash';

const data = [
  {
    "id": "1",
    "programmeId": "1",
    "intake": "100",
    "batchFromYear": "2020",
    "batchToYear": "2021",
    "lateralIntake": "20",
    "additionalDivision": "yes",
    "additionalIntake": "10"
  },
  {
    "id": "2",
    "programmeId": "1",
    "intake": "50",
    "batchFromYear": "2021",
    "batchToYear": "",
    "lateralIntake": "10",
    "additionalDivision": "yes",
    "additionalIntake": "5"
  },
  {
    "id": "3",
    "programmeId": "2",
    "intake": "100",
    "batchFromYear": "2020",
    "batchToYear": "2020",
    "lateralIntake": "20",
    "additionalDivision": "yes",
    "additionalIntake": "10"
  },
  {
    "id": "4",
    "programmeId": "2",
    "intake": "50",
    "batchFromYear": "2021",
    "batchToYear": "2020",
    "lateralIntake": "10",
    "additionalDivision": "yes",
    "additionalIntake": "5"
  },
  {
    "id": "4",
    "programmeId": "3",
    "intake": "50",
    "batchFromYear": "2021",
    "batchToYear": "",
    "lateralIntake": "10",
    "additionalDivision": "yes",
    "additionalIntake": "5"
  },
  {
    "id": "5",
    "programmeId": "4",
    "intake": "50",
    "batchFromYear": "2021",
    "batchToYear": "",
    "lateralIntake": "10",
    "additionalDivision": "yes",
    "additionalIntake": "5"
  }
];

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/settings/degree-programme/:programId/program-intake/list',
    method: 'GET',
    body({ body, query }) {
      const recs = _.filter(data, { programmeId: query.programId });
      return {
        code: 200,
        data: {
          total: recs.length,
          records: recs,
        }
      };
    },
  },
] as MockOptions;

export default defineMock(mockMethods);
