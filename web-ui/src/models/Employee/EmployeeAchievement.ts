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
    achievement: { type: 'string', db: 'achievement' },
    details: { type: 'string', db: 'details' },
    document: { type: 'string', db: 'document' }
};

export const schemaRules = yup.object().shape({
    id: yup.string(),
    empId: yup.string().required('required'),
    academicYear: yup.string().required('required'),
    achievement: yup.string().required('required'),
    details: yup.string().required('required'),
    document: yup.string().required('required')
});

export const columns = (settings: any) => {
    const cols: ColumnsType<any> = [
        { dataIndex: 'id', title: 'Sr.No' },
        { dataIndex: 'academicYear', title: 'Academic Year' },
        { dataIndex: 'achievement', title: 'Achievement' },
        { dataIndex: 'details', title: 'Details' },
        {
            dataIndex: 'document', title: 'Document', render(value, record, index) {
                return record.document === '' ? '-' : record.document
            }
        },
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
    return JSON.stringify({ employeeAchievement: { ...data } });
};
