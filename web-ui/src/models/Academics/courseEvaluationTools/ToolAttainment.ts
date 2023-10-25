import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as yup from 'yup';
import * as toolsRepository from '@/models/Academics/courseEvaluationTools/ToolsRepository';
import { isEmptyValue } from '@/utils/object';

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
  toolId: { type: 'string', db: 'tools_id' },
  academicYear: { type: 'integer', db: 'academic_year' },
  programId: { type: 'integer', db: 'program_id' },
  targetPer1: { type: 'integer', db: 'target_level1' },
  targetPer2: { type: 'integer', db: 'target_level2' },
  targetPer3: { type: 'integer', db: 'target_level3' },

  // foreign key data at the end
  [`${toolsRepository.tableName}$toolName`]: toolsRepository.allColumns.toolName,
  [`${toolsRepository.tableName}$toolType`]: toolsRepository.allColumns.toolType,
  [`${toolsRepository.tableName}$toolDependency`]: toolsRepository.allColumns.toolDependency,
  [`${toolsRepository.tableName}$toolAssessment`]: toolsRepository.allColumns.toolAssessment,
  [`${toolsRepository.tableName}$dependentToolIds`]: toolsRepository.allColumns.dependentToolIds,

};

export const schemaRules = yup.object().shape({
  toolId: yup.string().required('required'),
  academicYear: yup.string().required('required'),
  confirmcheckbox: yup.string().required('required'),
  programId: yup.string().required('required'),
  targetPer1: yup.string().matches(/^[0-9]+$/, 'please enter numbers only.')
    .when(['$formValues', '$settings'], (formValues, settings, schema) => {
      if (parseInt(formValues.targetPer1) > 100) {
        return schema.test('failed', 'should be less than equal to 100', (value, { createError }) => {
          return false;
        });
      }
      else if (!isEmptyValue(parseInt(formValues.targetPer2))) {
        if (parseInt(formValues.targetPer1) >= parseInt(formValues.targetPer2)) {
          return schema.test('failed', 'should be less than Level 2 ', (value, { createError }) => {
            return false;
          });
        }
      }
      else if (!isEmptyValue(parseInt(formValues.targetPer3))) {
        if (parseInt(formValues.targetPer1) >= parseInt(formValues.targetPer3)) {
          return schema.test('failed', 'should be less than Level 2 ', (value, { createError }) => {
            return false;
          });
        }
      }
      return schema.required();
    }),
  targetPer2: yup.string().matches(/^[0-9]+$/, 'please enter numbers only.')
    .when(['$formValues', '$settings'], (formValues, settings, schema) => {
      if (parseInt(formValues.targetPer1) > 100) {
        return schema.test('failed', 'should be less than equal to 100', (value, { createError }) => {
          return false;
        });
      }
      else if (!isEmptyValue(formValues.targetPer1)) {
        if (parseInt(formValues.targetPer1) >= parseInt(formValues.targetPer2)) {
          return schema.test('failed', 'should be greater than Level 1 ', (value, { createError }) => {
            return false;
          });
        }
      }
      if (!isEmptyValue(formValues.targetPer3)) {
        if (parseInt(formValues.targetPer2) >= parseInt(formValues.targetPer3)) {
          return schema.test('failed', 'should be less than Level 3 ', (value, { createError }) => {
            return false;
          });
        }
      }
      return schema.required();
    }),
  targetPer3: yup.string().matches(/^[0-9]+$/, 'please enter numbers only.')
    .when(['$formValues', '$settings'], (formValues, settings, schema) => {
      if (parseInt(formValues.targetPer3) > 100) {
        return schema.test('failed', 'should be less than equal to 100', (value, { createError }) => {
          return false;
        });
      }
      else if (!isEmptyValue(formValues.targetPer2)) {
        if (parseInt(formValues.targetPer2) >= parseInt(formValues.targetPer3)) {
          return schema.test('failed', 'should be greater than Level 2 ', (value, { createError }) => {
            return false;
          });
        }
      }
      if (!isEmptyValue(formValues.targetPer2)) {
        if (parseInt(formValues.targetPer1) >= parseInt(formValues.targetPer3)) {
          return schema.test('failed', 'should be greater than Level 1 ', (value, { createError }) => {
            return false;
          });
        }
      }

      return schema.required();
    }),
});

export const columns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'tools_repository$toolName', title: 'Tool Name' },
    { dataIndex: 'tools_repository$toolType', title: 'Tool Type' },
    { dataIndex: 'tools_repository$toolDependency', title: 'Tool Dependency' },

  ];

  cols.push({
    title: 'Attainment Levels',
    children: [
      { dataIndex: 'targetPer1', title: 'Level 1' },
      { dataIndex: 'targetPer2', title: 'Level 2' },
      { dataIndex: 'targetPer3', title: 'Level 3 ' },
    ],
  });

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
