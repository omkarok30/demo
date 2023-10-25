import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as yup from 'yup';
import { convertForSubmit } from '@/utils/cast';

export const tableName = 'tools_repository';

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

  toolName: { type: 'string', db: 'tool_name' },
  toolType: { type: 'string', db: 'tool_type' },
  toolDependency: { type: 'string', db: 'tool_dependency' },
  toolAssessment: { type: 'string', db: 'tool_assessment' },
  toolCoAttainment: { type: 'string', db: 'tool_co_attainment' },
  toolPublish: { type: 'string', db: 'tool_publish' },
  endSemExam: { type: 'string', db: 'end_sem_exam' },
  inactive: { type: 'boolean', db: 'in_active' },
  isUgPg: { type: 'boolean', db: 'is_ug_pg' },
  dependentToolIds: { type: 'json', db: 'dependent_tool_ids' },
};

export const schemaRules = yup.object().shape({
  toolName: yup.string().required('required'),
  toolType: yup.string().required('required'),
  toolDependency: yup.string().required('required'),
  toolAssessment: yup.string().required('required'),
  toolCoAttainment: yup.string().required('required'),
  toolPublish: yup.string().required('required'),
  endSemExam: yup.string().required('required'),
});

export const columns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'toolName', title: 'Tool Name' },
    { dataIndex: 'toolType', title: 'Tool Type' },
    { dataIndex: 'toolCoAttainment', title: 'Tool Applicable for Co Attainment' },
    { dataIndex: 'toolPublish', title: 'Tool Applicable for Publish Option' },
    { dataIndex: 'endSemExam', title: 'Tool Applicable for End Semester Exam' },
    { dataIndex: 'toolDependency', title: 'Tool Dependency' },
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
  return JSON.stringify({ department: { ...data } });
};
