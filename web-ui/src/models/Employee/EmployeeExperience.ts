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
    organization: { type: 'string', db: 'organization' },
    joiningDate: { type: 'date', db: 'joining_date' },
    leavingDate: { type: 'date', db: 'leaving_date' },
    typeOfExperience: { type: 'string', db: 'type_of_experience' },
    joiningDesignation: { type: 'string', db: 'joining_designation' },
    leavingDesignation: { type: 'string', db: 'leaving_designation' },
    salary: { type: 'string', db: 'salary' },
    achievments: { type: 'string', db: 'achievments' },
    experienceDocument: { type: 'string', db: 'experience_document' },
    releavingDocument: { type: 'string', db: 'releaving_document' }
};

export const schemaRules = yup.object().shape({
    id: yup.string(),
    empId: yup.string().required('required'),
    organization: yup.string().required('required'),
    joiningDate: yup.string().required('required'),
    leavingDate: yup.string().required('required'),
    typeOfExperience: yup.string().required('required'),
    joiningDesignation: yup.string().required('required'),
    leavingDesignation: yup.string().required('required'),
    salary: yup.string().required('required'),
    achievments: yup.string().required('required'),
    experienceDocument: yup.string().required('required'),
    releavingDocument: yup.string().required('required')
});

export const columns = (settings: any) => {
    const cols: ColumnsType<any> = [
        { dataIndex: 'id', title: 'Sr.No' },
        { dataIndex: 'typeOfExperience', title: 'Type of Experience' },
        { dataIndex: 'joiningDate', title: 'Years of Experience' },
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
    return JSON.stringify({ employeeExperience: { ...data } });
};
