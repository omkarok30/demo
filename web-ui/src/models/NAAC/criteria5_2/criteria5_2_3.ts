import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as yup from 'yup';
import { convertForSubmit } from '@/utils/cast';

export const allColumns = {
  id: { type: 'string', db: 'id' },
  version: { type: 'integer', db: 'version' },
  createdAt: { type: 'date', db: 'created_at' },
  createdBy: { type: 'string', db: 'created_by' },
  updatedAt: { type: 'date', db: 'updated_at' },
  updatedBy: { type: 'string', db: 'updated_by' },
  deletedAt: { type: 'date', db: 'deleted_at' },
  deletedBy: { type: 'string', db: 'deleted_by' },
  props: { type: 'json', db: 'props' },
  // This record should be fetched from student record beneficiery details
  academicYear: { type: 'integer', db: 'academic_year' },
  studentCount: { type: 'integer', db: 'student_count' },
  registrationNumber: { type: 'string', db: 'registration_number' },
  studentId: { type: 'string', db: 'student_id' },
  document: { type: 'string', db: 'document' },
  examDetails: { type: 'string', db: 'exam_details' },
};

export const schemaRules = yup.object().shape({
  type: yup.string().required('required'),
  academicYear: yup.string().required('required'),
  studentCount: yup.string().required('required'),
  registrationNumber: yup.string().required('required'),
  examDetails: yup.string().required('required'),
});

export const columns = () => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'year', key: 'year', title: 'Year', width: 100 },
    { dataIndex: 'national_international_exam$count', key: 'national_international_exam$count', title: '5.2.3.1. Number of students qualifying in state/ national/ international level examinations (eg: JAM/CLAT/NET/ SLET/ GATE/ GMAT/CAT/GRE/ TOEFL/ Civil Services/ State government examinations) during the year', width: 300 },
    { dataIndex: 'student_appearing_exam$count', key: 'student_appearing_exam$count', title: '5.2.3.2 Number of students appearing in state/ national/ international level examinations (eg: JAM/CLAT/NET/ SLET/ GATE/ GMAT/CAT,GRE/ TOFEL/ Civil Services/ State government examinations) during the year', width: 300 },
  ];
  return cols;
};

export const columnsExamination = (settings: any) => {
  const cols: ColumnsType<any> = [
    {
      title: 'Sr. No.',
      dataIndex: 'id',
      width: 60,
    },
    {
      dataIndex: 'registrationNumber',
      key: 'registrationNumber',
      title: 'Registration number/roll number for the exam',
      render: (_, record) => record.registrationNumber,
    },
    {
      title: 'Names of students selected/ qualified',
      dataIndex: 'studentName',
      key: 'studentName',
      render: (_, record) => {
        return `${record.student_info$firstName} ${record.student_info$middleName} ${record.student_info$lastName
          }`;
      },
    },
    {
      title: 'Names of students selected/qualified',
      children: [
        {
          title: 'NET',
          dataIndex: 'examDetails',
          render: examDetails => examDetails.map(examDetail => examDetail.net),
          key: 'net',
          width: 60,
        },
        {
          title: 'SLET',
          dataIndex: 'examDetails',
          render: examDetails => examDetails.map(examDetail => examDetail.slet),
          key: 'slet',
          width: 70,
        },
        {
          title: 'GATE',
          dataIndex: 'examDetails',
          render: examDetails => examDetails.map(examDetail => examDetail.gate),
          key: 'gate',
          width: 70,
        },
        {
          title: 'GMAT',
          dataIndex: 'examDetails',
          render: examDetails => examDetails.map(examDetail => examDetail.gmat),
          key: 'gmat',
          width: 80,
        },
        {
          title: 'CAT',
          dataIndex: 'examDetails',
          render: examDetails => examDetails.map(examDetail => examDetail.cat),
          key: 'cat',
          width: 60,
        },
        {
          title: 'GRE',
          dataIndex: 'examDetails',
          render: examDetails => examDetails.map(examDetail => examDetail.gre),
          key: 'gre',
          width: 60,
        },
        {
          title: 'JAM',
          dataIndex: 'examDetails',
          render: examDetails => examDetails.map(examDetail => examDetail.jam),
          key: 'jam',
          width: 70,
        },
        {
          title: 'IELTS',
          dataIndex: 'examDetails',
          render: examDetails => examDetails.map(examDetail => examDetail.ielts),
          key: 'ielts',
          width: 80,
        },
        {
          title: 'TOEFL',
          dataIndex: 'examDetails',
          render: examDetails => examDetails.map(examDetail => examDetail.toefl),
          key: 'toefl',
          width: 80,
        },
        {
          title: 'Civil Services',
          dataIndex: 'examDetails',
          render: examDetails => examDetails.map(examDetail => examDetail.civilservices),
          key: 'civilservices',
        },
        {
          title: 'State government examinations',
          dataIndex: 'examDetails',
          render: examDetails => examDetails.map(examDetail => examDetail.stategovexam),
          key: 'stategovexam',
        },
        {
          title: 'Other examinations conducted by the State / Central Government Agencies (Specify)',
          dataIndex: 'examDetails',
          render: examDetails => examDetails.map(examDetail => examDetail.other),
          key: 'other',
        },
      ],
    },

  ];
  return cols;
};

export const submitJSON = (values: any, modelOnly = true) => {
  let data = {};
  _.each(values, (value, key) => {
    if (modelOnly && _.has(allColumns, key)) {
      _.set(data, [key], value);
    }
  });
  data = convertForSubmit(data, allColumns);
  return JSON.stringify({ NAACCriteria522: { ...data } });
};
