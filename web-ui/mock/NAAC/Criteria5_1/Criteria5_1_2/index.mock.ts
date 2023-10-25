import { MockOptions, defineMock } from 'vite-plugin-mock-dev-server';

const data = [
  {
    id: '1',
    yearAt: '2017',
    year: '2017-18',
    studentBeneiciaryDetails$count: '300',
    studentPromotionMap$count: '1565',
  },
  {
    id: '2',
    yearAt: '2018',
    year: '2018-19',
    studentBeneiciaryDetails$count: '90',
    studentPromotionMap$count: '2275',
  },
  {
    id: '3',
    yearAt: '2019',
    year: '2019-20',
    studentBeneiciaryDetails$count: '50',
    studentPromotionMap$count: '2289',
  },
  {
    id: '4',
    yearAt: '2020',
    year: '2020-21',
    studentBeneiciaryDetails$count: '',
    studentPromotionMap$count: '1758',
  },
  {
    id: '5',
    yearAt: '2021',
    year: '2021-22',
    studentBeneiciaryDetails$count: '300',
    totalNoOfStudents: '1565',
  },
  {
    id: '6',
    yearAt: '2022',
    year: '2022-23',
    studentBeneiciaryDetails$count: '30',
    studentPromotionMap$count: '2289',
  },
];

const scholarshipData = [
  {
    id: '1',
    year: '2017',
    studentBeneiciaryDetails$governmentScheme: '',
    studentBeneiciaryDetails$count: '90',
    studentBeneiciaryDetails$sumgovernmentAmount: '',
    studentPromotionMap$count: '2275',
    studentBeneiciaryDetails$privateScheme: '1',
    studentBeneiciaryDetails$sumprivateAmount: '90',

  },
  {
    id: '2',
    year: '2018',
    studentBeneiciaryDetails$governmentScheme: '1',
    studentBeneiciaryDetails$count: '1',
    studentBeneiciaryDetails$sumgovernmentAmount: '44',
    studentBeneiciaryDetails$privateScheme: '',
    studentBeneiciaryDetails$sumprivateAmount: '',
  },
];

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
    url: '/:api?/:tenant?/v1/NAAC/criteria5/5.1.2/nongovernment/list/:year',
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
    url: '/:api?/:tenant?/v1/NAAC/criteria5/5.1.2/nongovernment/institute/get/:year',
    method: 'GET',
    body({ params }) {
      const result = scholarshipData.filter((list: any) => list.year == params.year);
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
    url: '/:api?/:tenant?/v1/NAAC/criteria5/5.1.2/nongovernment/students/get/:year',
    method: 'GET',
    body({ params }) {
      const result = studentData.filter((list: any) => list.year == params.year);
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
