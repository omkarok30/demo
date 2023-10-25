import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as yup from 'yup';
// import * as toolsRepository from './createTools/AcademicTools';
import * as student_info from '@/models/admissions/studentRecords/StudentInfo';


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
  
  studentId: { type: 'string', db: 'student_id' },
  issueStatus: { type: 'string', db: 'issue_status' },
  transferCertificateNumber:  { type: 'string', db: 'transfer_certificate_number' },
  migrationCertificateNumber:{ type: 'string', db: ' migration_certificate_number' },
  dateOfIssue: { type: 'date', db: 'date_of_issue' },
  remark: { type: 'string', db: ' remark' },
  conduct: { type: 'string', db: ' conduct' },
  dateOfLeave: { type: 'date', db: 'date_of_leave' },
  uploadAcknowlegementStatus: { type: 'string', db: 'upload_acknowlegement_status' },
  uploadDocuments:{ type: 'string', db: 'upload_documents' },
  acknowledgementUploadDate:{ type: 'date', db: 'acknowledgement_upload_date' },
  printDuplicateStatus: { type: 'string', db: 'printDuplicateStatus' },
  duplicateAcknowledgementDocument: { type: 'string', db: 'duplicate_acknowledgement_document' },
  duplicate1AcknowledgementDocument: { type: 'string', db: 'duplicate1_acknowledgement_document' },
  dateOfIssueMigration: { type: 'date', db: 'date_of_issue_migration' },
  dateOfIssueDuplicate1:{ type: 'date', db: 'date_of_issue_migration1' },
  dateOfIssueDuplicate2:{ type: 'date', db: 'date_of_issue_migration2' },
  printMigration: { type: 'string', db: 'print_migration' },
  uploadMigrationDocument: { type: 'string', db: 'upload_migration_document' },
  progress: { type: 'string', db: 'progress' },
  leavingReason:{ type: 'string', db: 'leaving_reason' },

  // foreign key data at the end
//   [`${toolsRepository.tableName}$toolName`]: toolsRepository.allColumns.toolName,
//   [`${toolsRepository.tableName}$toolType`]: toolsRepository.allColumns.toolType,
//   [`${toolsRepository.tableName}$toolDependency`]: toolsRepository.allColumns.toolDependency,
//   [`${toolsRepository.tableName}$toolAssessment`]: toolsRepository.allColumns.toolAssessment,
//   [`${toolsRepository.tableName}$dependentToolIds`]: toolsRepository.allColumns.dependentToolIds,
[`${student_info.tableName}$firstName`]: student_info.allColumns.firstName,
[`${student_info.tableName}$middleName`]: student_info.allColumns.middleName,
[`${student_info.tableName}$lastName`]: student_info.allColumns.lastName,

};

export const schemaRules = yup.object().shape({
  conduct: yup.string().required('required'),
  dateOfLeave: yup.mixed().required('required'),
  leavingReason: yup.string().required('required'),
  dateOfIssue: yup.mixed().required('required'),
  uploadDocuments:yup.string().required('required'),

});

export const columns = (settings: any) => {
  const cols: ColumnsType<any> = [
    // { dataIndex: 'id', title: 'Sr. No.' },
    // { dataIndex: 'studentId', title: 'Student Name' },
    // { dataIndex: 'studentId', title: 'Student Code' },
    { dataIndex: 'transferCertificateNumber', title: 'TC No.' },
    { dataIndex: 'dateOfIssue', title: 'Date of Issue' },
    { dataIndex: 'migrationCertificateNumber', title: 'Certificate No.' },
    { dataIndex: 'dateOfIssueMigration', title: 'Date of Issue' },

  ];


  return cols;
};

export const submitJSON = (values: any, modelOnly = true) => {
  const data = {};
  _.each(values, (value, key) => {
    if (modelOnly && _.has(allColumns, key)) {
      _.set(data, [key], value);
    }
  });
  return JSON.stringify(data);
};
