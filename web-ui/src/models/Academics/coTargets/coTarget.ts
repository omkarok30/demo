import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as courseRepository from '@/models/Academics/courseManagement/manageCourses/ManageCourses';
import { convertForSubmit } from '@/utils/cast';
import * as toolsRepository from '@/models/Academics/courseEvaluationTools/ToolsRepository';

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
  academicYear: { type: 'integer', db: 'academic_year' },
  degreeLevel: { type: 'string', db: 'degree_level' },
  departmentId: { type: 'string', db: 'department_id' },
  programmeId: { type: 'string', db: 'programme_id' },
  className: { type: 'string', db: 'class_name' },
  semester: { type: 'string', db: 'semester' },
  division: { type: 'string', db: 'division' },
  courseId: { type: 'string', db: 'course_id' },
  coTargetInValue: { type: 'string', db: 'co_target_in_value' },
  coTargetExValue: { type: 'string', db: 'co_target_ex_value' },
  coTargetInAverage: { type: 'string', db: 'co_target_in_average' },
  coTargetExAverage: { type: 'string', db: 'co_target_ex_average' },
  coTargetInWeight: { type: 'string', db: 'co_target_in_weight' },
  coTargetExWeight: { type: 'string', db: 'co_target_ex_weight' },

  [`${courseRepository.tableName}$name`]: courseRepository.allColumns.name,
  [`${courseRepository.tableName}$code`]: courseRepository.allColumns.code,
  [`${toolsRepository.tableName}$toolName`]: toolsRepository.allColumns.toolName,

};

export const columns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'id', title: 'Sr.No' },
    { dataIndex: 'courses$code', title: 'Code' },
    { dataIndex: 'courses$name', title: 'Course Name' },
  ];
  return cols;
};


export const internalexternalCols = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'id', title: 'Sr.No' },
    { dataIndex: 'tools_repository$toolName', title: 'Tool Name' },
  ];
  return cols;
};

export const overallTargetColumns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'toolType', title: 'Tool Type' },
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
  return JSON.stringify({ termDuration: { ...data } });
};
