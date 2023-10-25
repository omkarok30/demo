import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';

const data = {
  total: 100,
  records: [
    {
      "id": "01GK3M5QERJR9VYAYC69K2F2PA",
      "createdBy": "system",
      "createdAt": "1669810643342",
      "updatedBy": "system",
      "updatedAt": "1669810643342",
      "deletedBy": "",
      "deletedAt": "",
      "version": "0",
      "key": "board",
      "value": "State Board",
      "name": "BD12 - Board",
      "lookup": ""
    },
    {
      "id": "01GK3M5QERJR9VYAYC69K2F2P9",
      "createdBy": "system",
      "createdAt": "1669810643342",
      "updatedBy": "system",
      "updatedAt": "1669810643342",
      "deletedBy": "",
      "deletedAt": "",
      "version": "0",
      "key": "exam_pattern",
      "value": "Annual",
      "name": "BD9 - Examination Pattern",
      "lookup": ""
    },
    {
      "id": "01GK3M5QERJR9VYAYC69K2F2P8",
      "createdBy": "system",
      "createdAt": "1669810643342",
      "updatedBy": "system",
      "updatedAt": "1669810643342",
      "deletedBy": "",
      "deletedAt": "",
      "version": "0",
      "key": "state",
      "value": "Maharashtra",
      "name": "BD8 - State",
      "lookup": ""
    },
    {
      "id": "01GK3M5QERJR9VYAYC69K2F2P7",
      "createdBy": "system",
      "createdAt": "1669810643342",
      "updatedBy": "system",
      "updatedAt": "1669810643342",
      "deletedBy": "",
      "deletedAt": "",
      "version": "0",
      "key": "country",
      "value": "India",
      "name": "BD7 - Country",
      "lookup": ""
    },
    {
      "id": "01GK3M5QERJR9VYAYC69K2F2P6",
      "createdBy": "system",
      "createdAt": "1669810643342",
      "updatedBy": "system",
      "updatedAt": "1669810643342",
      "deletedBy": "",
      "deletedAt": "",
      "version": "0",
      "key": "affiliation_type",
      "value": "Tier II",
      "name": "BD6 - Affiliation Type",
      "lookup": ""
    },
    {
      "id": "01GK3M5QERJR9VYAYC69K2F2P5",
      "createdBy": "system",
      "createdAt": "1669810643342",
      "updatedBy": "system",
      "updatedAt": "1669810643342",
      "deletedBy": "",
      "deletedAt": "",
      "version": "0",
      "key": "education_type",
      "value": "[\"Diploma Engineering\"]",
      "name": "BD5 - Education Type",
      "lookup": ""
    },
    {
      "id": "01GK3M5QERJR9VYAYC69K2F2P4",
      "createdBy": "system",
      "createdAt": "1669810643342",
      "updatedBy": "system",
      "updatedAt": "1669810643342",
      "deletedBy": "",
      "deletedAt": "",
      "version": "0",
      "key": "faculty_study",
      "value": "[\"Engineering\",\"Pharmacy\",\"Management\"]",
      "name": "BD4 - Faculty of Study",
      "lookup": ""
    },
    {
      "id": "01GK3M5QERJR9VYAYC69K2F2P3",
      "createdBy": "system",
      "createdAt": "1669810643342",
      "updatedBy": "system",
      "updatedAt": "1669810643342",
      "deletedBy": "",
      "deletedAt": "",
      "version": "0",
      "key": "level_of_education",
      "value": "[\"UG\",\"PG\",\"Diploma\"]",
      "name": "BD3 - Level of Education",
      "lookup": ""
    },
    {
      "id": "01GK3M5QERJR9VYAYC69K2F2P2",
      "createdBy": "system",
      "createdAt": "1669810643342",
      "updatedBy": "system",
      "updatedAt": "1669810643342",
      "deletedBy": "",
      "deletedAt": "",
      "version": "0",
      "key": "type_educational_unit",
      "value": "Private",
      "name": "BD2 - Type of Educational Unit",
      "lookup": ""
    },
    {
      "id": "01GK3M5QERJR9VYAYC69K2F2P1",
      "createdBy": "system",
      "createdAt": "1669810643342",
      "updatedBy": "system",
      "updatedAt": "1669810643342",
      "deletedBy": "",
      "deletedAt": "",
      "version": "0",
      "key": "type_entity",
      "value": "Company/Trust",
      "name": "BD1 - Type of Entity",
      "lookup": ""
    },
    {
      "id": "01GK3M5QERJR9VYAYC69K2F2P0",
      "createdBy": "system",
      "createdAt": "1669810643342",
      "updatedBy": "system",
      "updatedAt": "1669810643342",
      "deletedBy": "",
      "deletedAt": "",
      "version": "0",
      "key": "establish_year",
      "value": "2020",
      "name": "Establishment Year",
      "lookup": ""
    },
    {
      "id": "01GK3M5QERJR9VYAYC69K2F2P3",
      "createdBy": "system",
      "createdAt": "1669810643342",
      "updatedBy": "system",
      "updatedAt": "1669810643342",
      "deletedBy": "",
      "deletedAt": "",
      "version": "0",
      "key": "naac_version",
      "value": "version1",
      "name": "BD3 - NAAC Version",
      "lookup": ""
    },
  ],
};

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/settings/list',
    method: 'GET',
    body({ body }) {
      return {
        code: 200,
        data
      };
    },
  },
] as MockOptions;

export default defineMock(mockMethods);
