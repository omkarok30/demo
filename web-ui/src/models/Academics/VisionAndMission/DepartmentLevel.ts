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
    departmentId: { type: 'string', db: 'department_id' },
    vision: { type: 'string', db: 'vision' },
    approveVision: { type: 'string', db: 'approve_vision' },
    mision: { type: 'string', db: 'mision' },
    approveMision: { type: 'string', db: 'approve_mision' },
    isToYear: { type: 'boolean', db: 'is_toyear' },
    fromYear: { type: 'integer', db: 'from_year' },
    toYear: { type: 'integer', db: 'to_year' },
    isFreezed: { type: 'boolean', db: 'is_freezed' },
    momDocument: { type: 'string', db: 'mom_document' }
};

export const schemaRules = yup.object().shape({
    id: yup.string(),
    departmentId: yup.string().required('required'),
    vision: yup.string().required('required'),
    approveVision: yup.string(),
    mision: yup.string().required('required'),
    approveMision: yup.string(),
    isToYear: yup.string().required('required'),
    fromYear: yup.string().required('required'),
    toYear: yup.string().required('required'),
    isFreezed: yup.string().required('required'),
    momDocument: yup.string().required('required')
});

// export const columns = (settings: any) => {
//     const cols: ColumnsType<any> = [
//         { dataIndex: 'id', title: 'Sr.No' },
//         { dataIndex: 'academicYear', title: 'Academic Year' },
//         { dataIndex: 'achievement', title: 'Achievement' },
//         { dataIndex: 'details', title: 'Details' },
//         {
//             dataIndex: 'document', title: 'Document', render(value, record, index) {
//                 return record.document === '' ? '-' : record.document
//             }
//         },
//     ];
//     return cols;
// };

export const submitJSON = (values: any, modelOnly = true) => {
    const data = {};
    _.each(values, (value, key) => {
        if (modelOnly && _.has(allColumns, key)) {
            _.set(data, [key], value);
        }
    });
    return JSON.stringify({ employeeDepartmentLevel: { ...data } });
};
