import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as yup from 'yup';
import { convertForSubmit } from '@/utils/cast';

export const tableName = 'degree_program';
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
  levelOfEducation: { type: 'string', db: 'level_of_education' },
  programType: { type: 'string', db: 'program_type' },
  departmentId: { type: 'string', db: 'department_name' },
  programmeName: { type: 'string', db: 'programme_name' },
  programCode: { type: 'string', db: 'program_code' },
  degreeName: { type: 'string', db: 'degree_name' },
  programDuration: { type: 'integer', db: 'program_duration' },
  isFyApplicable: { type: 'bool', db: 'is_fy_applicable' },
  startYear: { type: 'integer', db: 'start_year' },
  closeYear: { type: 'integer', db: 'close_year' },
  affiliationType: { type: 'string', db: 'affiliation_type' },
  facultyOfStudy: { type: 'string', db: 'faculty_of_study' },
  examinationPattern: { type: 'string', db: 'examination_pattern' },
  implOfCbcs: { type: 'bool', db: 'impl_of_cbcs' },
  yearOfImpl: { type: 'integer', db: 'year_of_impl' },
  linkToDocument: { type: 'string', db: 'link_to_document' },
};

export const schemaRules = yup.object().shape({
  levelOfEducation: yup.string().required('required'),
  departmentId: yup.string().required('required'),
  facultyOfStudy: yup.string().required('required'),
  affiliationType: yup.string().required('required'),
  programmeName: yup.string().required('required').matches(/^[0-9aA-zZ\s]+$/, 'alphabets and numbers only.'),
  programDuration: yup.string().required('required'),
  isFyApplicable: yup.string().required('required'),
  degreeName: yup.string().required('required'),
  startYear: yup.string().required('required'),
  implOfCbcs: yup.string().required('required'),
  yearOfImpl: yup.string().required('required'),
  sanctionedIntake: yup.string().required('required').matches(/^[0-9]+$/, 'please enter numbers only.'),
  lateralIntake: yup.string().required('required').matches(/^[0-9]+$/, 'please enter numbers only.'),
  additionalDivision: yup.string().required('required'),
  additionalDivisionIntake: yup.string().required('required').matches(/^[0-9]+$/, 'please enter numbers only.'),
  batchStartYearFrom: yup.string().required('required'),
  batchStartYearTo: yup.string().required('required'),
  examinationPattern: yup.string().required('required'),
});

export const columns = (settings: any) => {
  // const levelOfEducation = settings.get('level_of_education') || [];
  const cols: ColumnsType<any> = [
    { dataIndex: 'levelOfEducation', title: 'Level Of Education' },
    { dataIndex: 'departmentId', title: 'Department' },
    { dataIndex: 'programmeName', title: 'Program' },
    { dataIndex: 'degreeName', title: 'Degree' },
    { dataIndex: 'facultyOfStudy', title: 'Faculty of Study' },
    { dataIndex: 'affiliationType', title: 'Affiliation Type' },
    { dataIndex: 'programCode', title: 'Program Code' },
    { dataIndex: 'programDuration', title: 'Program Duration(Years)' },
    { dataIndex: 'examinationPattern', title: 'Examination Pattern' },
    { dataIndex: 'startYear', title: 'Commencement Year' },
    { dataIndex: 'closeYear', title: 'Closure Year' },
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
  return JSON.stringify({ degreeProgramme: { ...data } });
};
