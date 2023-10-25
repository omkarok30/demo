import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';
import _ from 'lodash';

const data = [
  {
    "id": "1",
    "programmeId": "1",
    "name": "Enrollment No.",
    "fromYear": "2020",
    "toYear": "2021",
    "sameasstudentcode": "yes",
  },
  {
    "id": "2",
    "programmeId": "2",
    "name": "Enrollment No.",
    "fromYear": "2021",
    "toYear": "2022",
    "sameasstudentcode": "no"
  },
  {
    "id": "3",
    "programmeId": "2",
    "name": "PRN.NO",
    "fromYear": "2020",
    "toYear": "2021",
    "sameasstudentcode": "yes"
  },
  {
    "id": "4",
    "programmeId": "3",
    "name": "Enroll No",
    "fromYear": "2021",
    "toYear": "2020",
    "sameasstudentcode": "yes",
  },
  {
    "id": "5",
    "programmeId": "4",
    "name": "Enrollment No.",
    "fromYear": "2021",
    "toYear": "2020",
    "sameasstudentcode": "no",
  }
];

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/settings/degree-programme/:programId/nomenclature/list',
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
