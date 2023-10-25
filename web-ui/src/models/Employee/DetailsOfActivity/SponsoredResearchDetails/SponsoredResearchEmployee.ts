import _ from 'lodash';
import * as yup from 'yup';

// id|version|created_at|created_by|updated_at|updated_by|deleted_at|deleted_by|props|type|degree_name|degree_code|start_year|end_year|is_disabled|level_of_education|faculty_of_study|
export const tableName = 'sponseredResearchEmployee';
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
  sponsored_main_id: { type: 'string', db: 'sponsored_main_id' },
  sponsored_first_main_id: { type: 'string', db: 'sponsored_first_main_id' },
  empIds: { type: 'string', db: 'emp_ids' },
};

export const schemaRules = yup.object().shape({
  id: yup.string(),
  sponsored_main_id: yup.string().required('required'),
  sponsored_first_main_id: yup.string().required('required'),
  emp_ids: yup.string().required('required'),
});

// export const columns = (settings: any) => {
//     const cols: ColumnsType<any> = [
//         { dataIndex: 'id', title: 'Sr.No' },
//         { dataIndex: 'academicYear', title: 'Academic Year' },
//         { dataIndex: 'projectTitle', title: 'Project Title' },
//         { dataIndex: 'fundingAgency', title: 'Funding Agency Details' },
//         {
//             dataIndex: 'fundingAgencyType', title: 'Funding Agency Type', render(value, record, index) {
//                 return record.fundingAgencyType === '' ? '-' : record.fundingAgencyType
//             }
//         },
//         { dataIndex: 'nameOfPrincipalInvestigator', title: 'Principal Investigator' },
//         { dataIndex: 'nameOfPrincipalInvestigator', title: 'Co-Investigator/s' },
//         { dataIndex: 'sanctionDate', title: 'Date of Sanction' },
//         {
//             dataIndex: 'santionedAmount', title: 'Sanctioned Amount (INR)', render(value, record, index) {
//                 return record.santionedAmount === '' ? '-' : record.santionedAmount
//             }
//         },
//         { dataIndex: 'duration', title: 'Duration (Months)' },
//         { dataIndex: 'certificateDocument', title: 'Document' }
//     ];
//     return cols;
// };

export const submitJSON = (values: any, modelOnly = true) => {
  const data = {};
  _.each(values, (value, key) => {
    if (modelOnly && _.has(allColumns, key)) {
      _.set(data, [key], value);
    }
  });
  return JSON.stringify({ employeeSponsoredResearchEmployee: { ...data } });
};
