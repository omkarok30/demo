import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as yup from 'yup';
import * as corporateDetailsEmployee from '@/models/Employee/DetailsOfActivity/CorporateTrainingDetails/CorporateDetailEmployee';

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
    trainingProgramName: { type: 'string', db: 'training_program_name' },
    sponsoringAgency: { type: 'string', db: 'sponsoring_agency' },
    revenueGenerated: { type: 'string', db: 'revenue_generated' },
    duration: { type: 'string', db: 'duration' },
    consultancyDocument: { type: 'string', db: 'consultancy_document' },
    corporateMainId: { type: 'string', db: 'corporate_main_id' },
    numberOfTrainees: { type: 'string', db: 'number_of_trainees' },
      // foreign key data at the end
  [`${corporateDetailsEmployee.tableName}$empIds`]: corporateDetailsEmployee.allColumns.empIds,

};

export const schemaRules = yup.object().shape({
    id: yup.string(),
    empId: yup.string().required('required'),
    academicYear: yup.string().required('required'),
    trainingProgramName: yup.string().required('required'),
    sponsoringAgency: yup.string().required('required'),
    revenueGenerated: yup.string().required('required'),
    duration: yup.string().required('required'),
    consultancyDocument: yup.string().required('required'),
    corporateMainId: yup.string().required('required'),
    numberOfTrainees: yup.string().required('required'),
    corporateDetailsEmployee$empIds: yup.mixed().notRequired(),

});

export const columns = (settings: any) => {
    const cols: ColumnsType<any> = [
        { dataIndex: 'id', title: 'Sr.No' },
        { dataIndex: 'academicYear', title: 'Academic Year' },
        { dataIndex: 'trainingProgramName', title: 'Name of corporate training program' },
        { dataIndex: 'sponsoringAgency', title: 'Sponsoring agency with contact details' },
        { dataIndex: 'revenueGenerated', title: 'Revenue generated (INR)' },
        { dataIndex: 'duration', title: 'Duration (Hrs)' },
        { dataIndex: 'numberOfTrainees', title: 'Number of trainees' },
        { dataIndex: 'consultancyDocument', title: 'Document' }
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
    return JSON.stringify({ employeeCorporateTrainingDetails: { ...data } });
};
