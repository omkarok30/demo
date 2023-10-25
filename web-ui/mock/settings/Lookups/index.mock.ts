import _ from 'lodash';
import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';

const data = [
  {
    "id": "01GMYJC8B00JHV0CFHPZ3VCSBE",
    "createdBy": "system",
    "createdAt": "1680039784133",
    "updatedBy": "system",
    "updatedAt": "1680039784133",
    "deletedBy": "",
    "deletedAt": "",
    "version": "0",
    "kind": "",
    "type": "religions",
    "value": "[\"HINDU\", \"ISLAM\", \"CHRISTAIN\", \"JAIN\", \"SIKH\", \"BUDDHIST\", \"MUSALMAN\", \"MUSLIM\", \"MUSLIM SHIKALGAR\", \"NAVBOUDHA\", \"NA\"]",
    "name": "Manage Religions",
    "refId": "",
    "refType": "",
    "readonly": ""
  },
  {
    "id": "01GMYJC5Z30F65HX131TPFSPM5",
    "createdBy": "system",
    "createdAt": "1680039784133",
    "updatedBy": "system",
    "updatedAt": "1680039784133",
    "deletedBy": "",
    "deletedAt": "",
    "version": "0",
    "kind": "",
    "type": "appointment_types",
    "value": "[{\"subType\": \"REGULAR STIPENDIARY\", \"appointmentType\": \"TEMPORARY\"}, {\"subType\": \"REGULAR\", \"appointmentType\": \"ADHOC\"}, {\"subType\": \"CONTRACTUAL\", \"appointmentType\": \"CLOCK HOUR BASIS (CHB)\"}, {\"subType\": \"REGULAR\", \"appointmentType\": \"APPROVED (PROBATION)\"}, {\"subType\": \"REGULAR\", \"appointmentType\": \"APPROVED (PERMANENT)\"}, {\"subType\": \"REGULAR\", \"appointmentType\": \"APPROVED (TEMPORARY)\"}, {\"subType\": \"CONTRACTUAL\", \"appointmentType\": \"ADJUNCT\"}, {\"subType\": \"CONTRACTUAL\", \"appointmentType\": \"CONTRACTUAL\"}]",
    "name": "Manage Appointment Types",
    "refId": "",
    "refType": "",
    "readonly": ""
  },
  {
    "id": "01GMYJC0WHY73AM9H43P2CH8C6",
    "createdBy": "system",
    "createdAt": "1680039784133",
    "updatedBy": "system",
    "updatedAt": "1680039784133",
    "deletedBy": "",
    "deletedAt": "",
    "version": "0",
    "kind": "",
    "type": "user_types",
    "value": "[\"STUDENT\", \"TEACHING STAFF\", \"TEACHING STAFF\", \"PARENT\"]",
    "name": "User Types",
    "refId": "",
    "refType": "",
    "readonly": ""
  },
];

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/settings/lookups/list',
    method: 'GET',
    body({ body }) {
      return {
        code: 200,
        data: {
          total: data.length,
          records: data,
        }
      };
    },
  },
  {
    url: '/:api?/:tenant?/v1/settings/lookups/get/:id?',
    method: 'GET',
    body({ params }) {
      const rec = _.find(data, { id: params.id })
      return {
        code: 200,
        data: rec
      };
    },
  },
] as MockOptions;

export default defineMock(mockMethods);
