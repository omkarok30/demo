import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';
import _ from 'lodash';
import { size } from 'lodash';
const responseData = [
  {
    id: "1",
    studentId: "1",
    className: "first",
    generalRegisterNumber: "76238328327",
    prn: "2020032500186212",
    registrationYear: "2021",
    dateOfRegistration: "12-07-2019",
    admissionCategory: "open",
    admissionProcess: "cap1",
   // admissionProcessBy: "government",
    leavingReligion: "hindu",
    leavingCast: "maratha",
    leavingSubcast: "",
    lastInstitute: "government polytechnic",
  },
  {
    id: "2",
    studentId: "2",
    className: "second",
    generalRegisterNumber: "762383283290",
    prn: "20200325001862112",
    registrationYear: "2020",
    dateOfRegistration: "12-07-2020",
    admissionCategory: "open",
    admissionProcess: "cap2",
   // admissionProcessBy: "government",
    leavingReligion: "hindu",
    leavingCast: "maratha",
    leavingSubcast: "",
    lastInstitute: "government polytechnic",
  },
  {
    id: "3",
    studentId: "3",
    className: "first",
    generalRegisterNumber: "762383281327",
    prn: "20200325010186212",
    registrationYear: "2019",
    dateOfRegistration: "13-07-2019",
    admissionCategory: "open",
    admissionProcess: "cap1",
    //admissionProcessBy: "government",
    leavingReligion: "hindu",
    leavingCast: "maratha",
    leavingSubcast: "",
    lastInstitute: "government polytechnic",
  },
];


const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/admissions/admission_details/list',
    method: 'GET',
    body() {
      return {
        code: 200,
        data: {
          total: responseData.length,
          records: responseData,
        }
      };
    },
  },
  {
    url: '/:api?/:tenant?/v1/admissions/admission_details/get/:id?',
    method: 'GET',
    body({ params }) {
      const rec = _.find(responseData, { id: params.id });
      return {
        code: 200,
        data: {
          total: size(rec),
          records: rec,
        },
      };
    },
  },
] as MockOptions;

export default defineMock(mockMethods);

