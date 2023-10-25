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
    nameOfCommittee: { type: 'string', db: 'name_of_committee' },
    fromDate: { type: 'date', db: 'from_date' },
    toDate: { type: 'date', db: 'to_date' },
    certificateDocument: { type: 'string', db: 'certificate_document' },
    designation: { type: 'string', db: 'designation' },
};

export const schemaRules = yup.object().shape({
    id: yup.string(),
    empId: yup.string().required('required'),
    nameOfCommittee: yup.string().required('required'),
    fromDate: yup.string().required('required'),
    toDate: yup.string().required('required'),
    certificateDocument: yup.string().when(['$formValues', '$settings'], (formValues, settings, schema) => {
        if (!isEmptyValue(formValues.certificateDocument)) {
            return schema.matches(/^[A-Za-z ]*$/, 'Please Upload Document');
        }
        return schema.notRequired();
    }),
    designation: yup.string().required('required'),
});

export const columns = (settings: any) => {
    const cols: ColumnsType<any> = [
        { dataIndex: 'id', title: 'Sr.No' },
        { dataIndex: 'nameOfCommittee', title: 'Name of Committee/Body' },
        { dataIndex: 'designation', title: 'Designation' },
        { dataIndex: 'fromDate', title: 'From Date' },
        { dataIndex: 'toDate', title: 'To Date' },
        {
            dataIndex: 'certificateDocument', title: 'Document', render(value, record, index) {
                return record.certificateDocument === '' ? '-' : record.certificateDocument
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
    return JSON.stringify({ employeeMemberAcademicCouncilDetails: { ...data } });
};
