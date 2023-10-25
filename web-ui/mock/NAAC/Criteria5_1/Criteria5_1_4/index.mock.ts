import _ from 'lodash';
import { MockOptions, defineMock } from 'vite-plugin-mock-dev-server';

const data = [
  {
    id: '1',
    yearAt: '2017',
    year: '2017-18',
    studentBeneiciaryDetails$count: '90',
    studentPromotionMap$count: '2275',
    download: true,
    placements: 4,
    activity: [],
  },
  {
    id: '2',
    yearAt: '2018',
    year: '2018-19',
    studentBeneiciaryDetails$count: '90',
    studentPromotionMap$count: '2275',
    download: true,
    placements: 6,
    activity: [],
  },
  {
    id: '3',
    yearAt: '2019',
    year: '2019-20',
    studentBeneiciaryDetails$count: ' ',
    studentPromotionMap$count: '2289',
    download: false,
    placements: 45,
    activity: [],
  },
  {
    id: '4',
    yearAt: '2020',
    year: '2020-21',
    studentBeneiciaryDetails$count: '',
    studentPromotionMap$count: '1758',
    download: false,
    placements: 20,
    activity: [],
  },
  {
    id: '5',
    yearAt: '2021',
    year: '2021-22',
    studentBeneiciaryDetails$count: '300',
    studentPromotionMap$count: '1565',
    download: true,
    placements: 87,
    activity: [{
      id: 1,
      year: '2021-22',
      name: "COMPETITIVE EXAMINATION",
      studentsParticiated: 21,
      documents: "COMPETITIVE Docs",
      link: "COMPETITIVE Docs",
    }, {
      id: 2,
      year: '2021-22',
      name: "CAREER GUIDANCE",
      studentsParticiated: 1,
      documents: "COMPETITIVE Docs",
      link: "",
    }],
  },
  {
    id: '6',
    yearAt: '2022',
    year: '2022-23',
    studentBeneiciaryDetails$count: '30',
    studentPromotionMap$count: '2289',
    download: true,
    placements: 27,
    activity: [{
      id: 1,
      year: '2022-23',
      name: "COMPETITIVE EXAMINATION",
      studentsParticiated: 3,
      documents: "COMPETITIVE Docs",
      link: "COMPETITIVE",
    }],
  },
];

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/NAAC/criteria5/5.1.4/CompitativeExam/list/:year',
    method: 'GET',
    body({ params }) {
      const result = data.filter((list: any) => list.yearAt <= params.year);
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
    url: '/:api?/:tenant?/v1/NAAC/criteria5/5.1.4/get/:year',
    method: 'GET',
    body({ params }) {
      const result = _.find(data, { yearAt: params.year });
      return {
        code: 200,
        data: {
          records: result,
        },
      };
    },
  },
  {
    url: '/:api?/:tenant?/v1/NAAC/criteria5/5.1.4/get/:year',
    method: 'GET',
    body({ params }) {
      const result = _.find(data, { yearAt: params.year });
      return {
        code: 200,
        data: {
          records: result,
        },
      };
    },
  },
  {
    url: '/:api?/:tenant?/v1/NAAC/criteria5/5.1.4/edit/:id', //update Number of students placed through campus placement	
    method: 'PUT',
    body(req) {
      const { value } = req.body
      const params = req.params
      const result = data.map((list) => list.id === params.id ? { ...list, placements: value } : list);
      return {
        code: 200,
        data: {
          records: result,
        },
      };
    },
  },
  {
    url: '/:api?/:tenant?/v1/NAAC/criteria5/5.1.4/upload/:id/:activityId', //upload document for activity
    method: 'POST',
    body(req) {
      const { value } = req.body
      const { id, activityId } = req.params
      const result = _.find(data, { id: id });
      return {
        code: 200,
        data: {
          records: result,
        },
      };
    },
  },
] as MockOptions;

export default defineMock(mockMethods);
