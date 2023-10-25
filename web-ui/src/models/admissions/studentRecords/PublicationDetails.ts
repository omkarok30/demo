import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as yup from 'yup';

import { convertForSubmit } from '@/utils/cast';

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
  studId: { type: 'string', db: 'student_id' },
  academicYear: { type: 'integer', db: 'academic_year' },
  publicationLevel: { type: 'string', db: 'publication_level' },
  publicationType: { type: 'string', db: 'publication_type' },
  publicationDate: { type: 'date', db: 'publication_date' },
  authorsName: { type: 'string', db: 'authors_name' },
  typeOfPaper: { type: 'string', db: 'typeofpaper' },
  conferenceDetails: { type: 'string', db: 'conference_details' },
  titleofpaper: { type: 'string', db: 'titleofpaper' },
  relevantCo: { type: 'string', db: 'relevant_co' },
  relevantPo: { type: 'string', db: 'relevant_po' },
  certificateDocument: { type: 'string', db: 'certificate_document' },
  paperDocument: { type: 'string', db: 'paper_document' },

};

export const schemaRules = yup.object().shape({
  academicYear: yup.string().required('required'),
  publicationLevel: yup.string().required('required'),
  publicationType: yup.string().required('required'),
  publicationDate: yup.string().required('required'),
  authorsName: yup.string().required('required'),
  typeOfPaper: yup.string().required('required'),
  conferenceDetails: yup.string().required('required'),
  relevantPo: yup.mixed().required('required'),
  titleofpaper: yup.string(),
  relevantCo: yup.string(),
  certificateDocument: yup.string(),
  paperDocument: yup.string(),
});

export const columns = (settings: any) => {
  // const levelOfEducation = settings.get('level_of_education') || [];
  const cols: ColumnsType<any> = [
    { dataIndex: 'academicYear', title: 'Academic Year' },
    { dataIndex: 'publicationLevel', title: 'Publication Level' },
    { dataIndex: 'publicationType', title: 'Publication Type' },
    { dataIndex: 'publicationDate', title: 'Publication Date' },
    { dataIndex: 'authorsName', title: "Author's Name" },
    { dataIndex: 'typeOfPaper', title: 'Type of Paper' },
    { dataIndex: 'relevantPo', title: 'PO' },
    { dataIndex: 'relevantCo', title: 'CO' },
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
  return JSON.stringify({ publicationdetails: { ...data } });
};
