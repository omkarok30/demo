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
  toDate: { type: 'date', db: 'to_date' },
  fromDate: { type: 'date', db: 'from_date' },
  designation: { type: 'string', db: 'designation' },
  departmentId: { type: 'string', db: 'department_id' },
  appointmentStatus: { type: 'string', db: 'appointment_status' },
  dateOfAppointment: { type: 'date', db: 'date_of_appointment' },
  joiningYear: { type: 'string', db: 'joining_year' },
  toYear: { type: 'string', db: 'to_year' },
  appointmentType: { type: 'string', db: 'appointment_type' },
  subType: { type: 'string', db: 'sub_type' },
  appointmentDocument: { type: 'string', db: 'appointment_document' },
  userType: { type: 'string', db: 'user_type' },
  anotherDesignation: { type: 'string', db: 'another_designation' },
};

export const schemaRules = yup.object().shape({
  id: yup.string(),
  empCode: yup.string(),
  userType: yup.string(),
  designation:yup.string().required('required'),
  appointmentType:yup.string().required('required'), 
  subType:yup.string().required('required'), 
  dateOfAppointment:yup.string().required('required'), 
  toDate:yup.string().required('required'),
  fromDate:yup.string().required('required'),
});

export const columns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'id', title: 'Sr.No',responsive: ['md']},
    {dataIndex: 'designation', title: 'Designation',responsive: ['md'],},
    { dataIndex: 'userType', title: 'User Type',responsive: ['md'], },
    { dataIndex: 'appointmentType', title: 'Appointment Type',responsive: ['md'],},
    { dataIndex: 'subType', title: 'Appointment Sub-Type',responsive: ['md'],},
    { dataIndex: 'dateOfAppointment', title: 'Date Of Appointment',responsive: ['md'],},
    { dataIndex: 'fromDate', title: 'Date of Joining / Contract Start Date',responsive: ['md'],},
    { dataIndex: 'toDate', title: 'To Date',responsive: ['md'],},
    { dataIndex: 'departmentId', title: 'Parent Department',responsive: ['md'],},
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
