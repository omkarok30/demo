import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as yup from 'yup';
import { isEmptyValue } from '@/utils/object';
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
    organization: { type: 'string', db: 'organization' },
    subject: { type: 'string', db: 'subject' },
    lectureDuration: { type: 'string', db: 'lecture_duration' },
    date: { type: 'date', db: 'date' },
    document: { type: 'string', db: 'document' }
};

export const schemaRules = yup.object().shape({
    id: yup.string(),
    empId: yup.string().required('required'),
    organization: yup.string().required('required'),
    subject: yup.string().required('required'),
    lectureDuration: yup.string().required('required'),
    date: yup.string().required('required'),
    document: yup.string().when(['$formValues', '$settings'], (formValues, settings, schema) => {
        if (!isEmptyValue(formValues.document)) {
            return schema.matches(/^[A-Za-z ]*$/, 'Please Select Document');
        }
        return schema.notRequired();
    }),
});

export const columns = (settings: any) => {
    const cols: ColumnsType<any> = [
        { dataIndex: 'id', title: 'Sr.No' },
        { dataIndex: 'organization', title: 'Organization' },
        { dataIndex: 'subject', title: 'Subject' },
        { dataIndex: 'lectureDuration', title: 'No. of lectures' },
        { dataIndex: 'date', title: 'Date' },
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
    return JSON.stringify({ employeeGuestLecturerDetails: { ...data } });
};
