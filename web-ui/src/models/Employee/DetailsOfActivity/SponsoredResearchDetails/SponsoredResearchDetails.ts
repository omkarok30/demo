import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as yup from 'yup';
import * as sponseredResearchEmployee from '@/models/Employee/DetailsOfActivity/SponsoredResearchDetails/SponsoredResearchEmployee'
// id|version|created_at|created_by|updated_at|updated_by|deleted_at|deleted_by|props|type|degree_name|degree_code|start_year|end_year|is_disabled|level_of_education|faculty_of_study|
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
  empId: { type: 'string', db: 'emp_id' },
  academicYear: { type: 'string', db: 'academic_year' },
  projectTitle: { type: 'string', db: 'project_title' },
  fundingAgency: { type: 'string', db: 'funding_agency' },
  santionedAmount: { type: 'string', db: 'santioned_amount' },
  sanctionDate: { type: 'date', db: 'sanction_date' },
  duration: { type: 'string', db: 'duration' },
  certificateDocument: { type: 'string', db: 'certificate_document' },
  considerForAccreditation: { type: 'string', db: 'consider_for_accreditation' },
  nameOfPrincipalInvestigator: { type: 'string', db: 'name_of_principal_investigator' },
  fundingAgencyType: { type: 'string', db: 'funding_agency_type' },
  sponseredMainId: { type: 'string', db: 'sponsered_main_id' },
  [`${sponseredResearchEmployee.tableName}$empIds`]: sponseredResearchEmployee.allColumns.empIds,

};

export const schemaRules = yup.object().shape({
  id: yup.string(),
  empId: yup.string().required('required'),
  academicYear: yup.string().required('required'),
  projectTitle: yup.string().required('required'),
  fundingAgency: yup.string().required('required'),
  santionedAmount: yup.string().notRequired(),
  sanctionDate: yup.string().required('required'),
  duration: yup.string().required('required'),
  certificateDocument: yup.string().notRequired(),
  considerForAccreditation: yup.string().required('required'),
  nameOfPrincipalInvestigator: yup.string().required('required'),
  fundingAgencyType: yup.string().required('required'),
  sponseredMainId: yup.string().required('required'),
  sponseredResearchEmployee$empIds: yup.mixed().notRequired(),
});

export const columns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'id', title: 'Sr.No' },
    { dataIndex: 'academicYear', title: 'Academic Year' },
    { dataIndex: 'projectTitle', title: 'Project Title' },
    { dataIndex: 'fundingAgency', title: 'Funding Agency Details' },
    {
      dataIndex: 'fundingAgencyType',
      title: 'Funding Agency Type',
      render(value, record, index) {
        return record.fundingAgencyType === '' ? '-' : record.fundingAgencyType;
      },
    },
    { dataIndex: 'nameOfPrincipalInvestigator', title: 'Principal Investigator' },
    { dataIndex: 'sanctionDate', title: 'Date of Sanction' },
    {
      dataIndex: 'santionedAmount',
      title: 'Sanctioned Amount (INR)',
      render(value, record, index) {
        return record.santionedAmount === '' ? '-' : record.santionedAmount;
      },
    },
    { dataIndex: 'duration', title: 'Duration (Months)' },
    { dataIndex: 'certificateDocument', title: 'Document' },
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
  return JSON.stringify({ employeeSponsoredResearchDetails: { ...data } });
};
