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

  academicYear: { type: 'string', db: 'academic_year' },
  type:{ type: 'string', db: 'type' },
  levelOfProgram: { type: 'string', db: 'level_of_program' },
  courseName: { type: 'string', db: 'course_name' },
  certificateDocument:{ type: 'string', db: 'certificate_document' },

};

export const schemaRules = yup.object().shape({
  id: yup.string(),
  empCode: yup.string(),
  academicYear:yup.string().required('required'),
  type:yup.string().required('required'),
  levelOfProgram: yup.string().required('required'),
  courseName: yup.string().required('required'),
  certificateDocument:yup.string().required('required'),
});

export const columns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'id', title: 'Sr.No',responsive: ['md']},
    { dataIndex: 'academicYear', title: 'Academic Year',responsive: ['md'],},
    { dataIndex: 'type', title: 'Type',responsive: ['md'], },
    { dataIndex: 'levelOfProgram', title: 'Level of Program',responsive: ['md'],},
    { dataIndex: 'courseName', title: 'Course Name',responsive: ['md'],},
    { dataIndex: 'certificateDocument', title: 'Document',responsive: ['md'],},
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
