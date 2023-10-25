import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as yup from 'yup';

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
  courses: { type: 'string', db: 'courses' },
  semester: { type: 'string', db: 'semester' },
  coCreation: { type: 'string', db: 'co_creation' },
  copomapingindex: { type: 'string', db: 'copo_maping_index' },
  toolFrezed: { type: 'string', db: 'tool_frezed' },
  coTarget: { type: 'string', db: 'co_target' },
  toolcoLinking: { type: 'string', db: 'tool_co_linking' },
  toolEvalution: { type: 'string', db: 'tool_evalution' },
  toolcoAttainment: { type: 'string', db: 'tool_co_attainment' },
  courecoAttainment: { type: 'string', db: 'coure_co_Attainment' },
  division: { type: 'string', db: 'division' },
  nameTeachingstaff: { type: 'string', db: 'name_teachingstaff' },
  workload: { type: 'string', db: 'workload' },
  
};

export const schemaRules = yup.object().shape({
  id: yup.string(),
  courses: yup.string(),
  semester: yup.string().required('required'),
  coCreation: yup.string(),
  copomapingindex: yup.string().required('required'),
  toolFrezed: yup.string().required('required'),
  coTarget: yup.string().required('required'),
  toolcoLinking: yup.string().required('required'),
  toolEvalution: yup.string().required('required'),
  toolcoAttainment: yup.string().required('required'),
  courecoAttainment: yup.string().required('required'),
 
  division: yup.string().required('required'),
  class: yup.string().required('required'),

  nameTeachingstaff: yup.string().required('required'),
  workload: yup.string().required('required'),

});
export const common = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'courses', title: 'Course' },
    { dataIndex: 'semester', title: 'Semester' },
    { dataIndex: 'coCreation', title: 'CO Creation' },
    { dataIndex: 'toolFrezed', title: 'Tools Freezed' },
    { dataIndex: 'coTarget', title: 'CO Targets' },
    { dataIndex: 'toolcoLinking', title: 'Tool CO Linking' },
  ];
  return cols;
};

export const divisionwise = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'courses', title: 'Course' },
    { dataIndex: 'semester', title: 'Semester' },
    { dataIndex: 'toolEvalution', title: 'Tool Evaluation' },
    { dataIndex: 'toolcoAttainment', title: 'Tool CO Attainment' },
  
  ];
  return cols;
};
export const programwise = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'courses', title: 'Course' },
    { dataIndex: 'semester', title: 'Semester' },
    { dataIndex: 'copomapingindex', title: 'CO-PO Mapping ' },
    { dataIndex: 'toolcoAttainment', title: 'Tool CO Attainment' },
    { dataIndex: 'courecoAttainment', title: 'Course CO Attainment' },
  ];
  return cols;
};
export const workloaddistribution = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'nameTeachingstaff', title: 'Name of Teaching Staff' },
    { dataIndex: 'division', title: 'Division' },
    { dataIndex: 'semester', title: 'Semester' },
    { dataIndex: 'courses', title: 'Course' },
    { dataIndex: 'workload', title: 'Workload per week' },
  ];
  return cols;
};

export const Activty = (settings: any) => {
  const cols: ColumnsType<any> = [];
  return cols;
};
export const submitJSON = (values: any, modelOnly = true) => {
  const data = {};
  _.each(values, (value, key) => {
    if (modelOnly && _.has(allColumns, key)) {
      _.set(data, [key], value);
    }
  });
  return JSON.stringify({ employeeAddress: { ...data } });
};