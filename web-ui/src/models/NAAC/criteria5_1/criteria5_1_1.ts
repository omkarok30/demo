import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import { convertForSubmit } from '@/utils/cast';
import * as studentBeneiciaryDetails from '@/models/admissions/studentRecords/BeneficiaryDetails/ScholarshipDetails';
import * as studentPromotionMap from '@/models/promotion/studentPromotionMap';
import * as studentInfo from '@/models/admissions/studentRecords/StudentInfo';
import { todoLookUps } from '@/store/todoLookUps';

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
  year: { type: 'string', db: 'year' },
  [`${studentBeneiciaryDetails.allColumns.studentId}.count`]: studentBeneiciaryDetails.allColumns.studentId,
  [`${studentPromotionMap.allColumns.studId}.count`]: studentPromotionMap.allColumns.studId,
  [`${studentBeneiciaryDetails.allColumns.governmentScheme}`]: studentBeneiciaryDetails.allColumns.governmentScheme,
  [`${studentBeneiciaryDetails.allColumns.governmentAmount}.sumgovernmentAmount`]: studentBeneiciaryDetails.allColumns.governmentAmount,
  [`${studentBeneiciaryDetails.allColumns.privateScheme}`]: studentBeneiciaryDetails.allColumns.privateScheme,
  [`${studentBeneiciaryDetails.allColumns.privateAmount}.sumprivateAmount`]: studentBeneiciaryDetails.allColumns.privateAmount,

  [`${studentInfo.tableName}$scholarNumber`]: studentInfo.allColumns.scholarNumber,
  [`${studentInfo.tableName}$firstName`]: studentInfo.allColumns.firstName,
  [`${studentInfo.tableName}$lastName`]: studentInfo.allColumns.lastName,
  [`${studentInfo.tableName}$middleName`]: studentInfo.allColumns.middleName,
  [`${studentInfo.tableName}$programId`]: studentInfo.allColumns.programId,
  [`${studentInfo.tableName}$className`]: studentInfo.allColumns.className,

};

export const columns = (settings: any) => {
  const naac_version = settings.get('naac_version') || [];

  let title = '';
  if (naac_version === 'version4') {
    title = 'Number of students benefited by scholarships and free ships provided by the Government and Non-Government';
  }
  else {
    title = 'Number of students benefited by scholarships and free ships provided by the Government during the year';
  }
  const cols: ColumnsType<any> = [
    { dataIndex: 'year', key: 'year', title: 'Year', width: 100 },
    { dataIndex: 'studentBeneiciaryDetails$count', key: 'studentBeneiciaryDetails$count', title: `${title}`, width: 300 },
    { dataIndex: 'studentPromotionMap$count', key: 'studentPromotionMap$count', title: 'Total number of students', width: 300 },
  ];
  return cols;
};

export const columnsScholarship = (settings: any) => {
  const cols: ColumnsType<any> = [
    { title: 'Sr. No.', dataIndex: 'id', key: 'id' },
    { dataIndex: 'year', key: 'year', title: 'Year' },
    {
      dataIndex: 'schemeName',
      key: 'schemeName',
      title: 'Name of the scheme',
      render: (_, record) => {
        if (record.studentBeneiciaryDetails$governmentScheme) {
          const schemeList = todoLookUps.getState().governmentScheme;
          const schemeName = schemeList.filter(list => list.value === record.studentBeneiciaryDetails$governmentScheme)[0];
          return schemeName?.label;
        }
        else if (record.studentBeneiciaryDetails$privateScheme) {
          const schemeList = todoLookUps.getState().privateScheme;
          const schemeName = schemeList.filter(list => list.value === record.studentBeneiciaryDetails$privateScheme)[0];
          return schemeName?.label;
        }
        return '-';
      },
    },
    {
      title: 'Number of students benefited by government scheme and amount',
      children: [
        {
          title: 'Number of students',
          dataIndex: 'studentBeneiciaryDetails$count',
          key: 'studentBeneiciaryDetails$count',
          width: 200,
        },
        {
          title: 'Amount(Rs)',
          dataIndex: 'studentBeneiciaryDetails$sumgovernmentAmount',
          key: 'studentBeneiciaryDetails$sumgovernmentAmount',
          width: 200,
        },
      ],
    },
    {
      title: 'Number of students benefited by the institution / non-government schemes and amount',
      children: [
        {
          title: 'Number of students',
          dataIndex: 'studentBeneiciaryDetails$count',
          key: 'studentBeneiciaryDetails$count',
          width: 200,
        },
        {
          title: 'Amount(Rs)',
          dataIndex: 'studentBeneiciaryDetails$sumgovernmentAmount',
          key: 'studentBeneiciaryDetails$sumprivateAmount',
          width: 200,
        },
      ],
    }, {
      title: 'Link to the relevant document',
      dataIndex: 'document',
      key: 'document',
    },
  ];
  return cols;
};

export const columnsStudents = (settings: any) => {
  const cols: ColumnsType<any> = [
    { title: 'Sr. No.', dataIndex: 'id', key: 'id' },
    { dataIndex: 'studentInfo$scholarNumber', key: 'studentInfo$scholarNumber', title: 'Student Code' },
    { title: 'Student Name', dataIndex: 'studentName', key: 'studentName', render: (_, record) => `${record.studentInfo$firstName} ${record.studentInfo$middleName} ${record.studentInfo$lastName}` },
    { dataIndex: 'amount', key: 'amount', title: 'Amount(Rs)' },
    { dataIndex: 'studentInfo$programId', key: 'studentInfo$programId', title: 'Program Name' },
    { dataIndex: 'studentInfo$className', key: 'studentInfo$className', title: 'Class' },
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
  return JSON.stringify({ NAACCriteria511: { ...data } });
};
