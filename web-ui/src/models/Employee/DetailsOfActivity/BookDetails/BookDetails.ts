import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as yup from 'yup';

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
  publicationYear: { type: 'string', db: 'publication_year' },
  authorName:{ type: 'string', db: 'author_name' },
  bookName: { type: 'string', db: 'book_name' },
  isbn: { type: 'string', db: 'isbn' },
  considerForAccreditation:{ type: 'string', db: 'consider_for_accreditation' },
  onlineLink: { type: 'string', db: 'online_link' },
  nameOfPublisher: { type: 'string', db: 'name_of_publisher' },

};

export const schemaRules = yup.object().shape({
  id: yup.string(),
  empCode: yup.string(),
  publicationYear:yup.string().required('required'),
  authorName:yup.string().required('required'),
  bookName: yup.string().required('required'),
  isbn: yup.string().required('required'),
  considerForAccreditation:yup.string().required('required'),
  onlineLink: yup.string(),
  nameOfPublisher:yup.string(),
 
});

export const columns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'id', title: 'Sr.No',responsive: ['md']},
    { dataIndex: 'authorName', title: 'Author',responsive: ['md'],},
    { dataIndex: 'bookName', title: 'Title of Book',responsive: ['md'], },
    { dataIndex: 'isbn', title: 'ISBN Number',responsive: ['md'],},
    { dataIndex: 'publicationYear', title: 'Year of Publication',responsive: ['md'],},
    { dataIndex: 'considerForAccreditation', title: 'Consider for Accreditation?',responsive: ['md'],},
    { dataIndex: 'nameOfPublisher', title: 'Name of Publisher',responsive: ['md'],},
    { dataIndex: 'onlineLink', title: 'Online Link',responsive: ['md'],},
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
  return JSON.stringify({ employeeDetails: { ...data } });
};
