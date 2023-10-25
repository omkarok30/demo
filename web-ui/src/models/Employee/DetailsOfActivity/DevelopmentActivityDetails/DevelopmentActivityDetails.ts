import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as yup from 'yup';
import { isEmptyValue } from '@/utils/object';
// id|version|created_at|created_by|updated_at|updated_by|deleted_at|deleted_by|props|type|degree_name|degree_code|start_year|end_year|is_disabled|level_of_education|faculty_of_study|
import * as developmentActivityEmployee from '@/models/Employee/DetailsOfActivity/DevelopmentActivityDetails/DevelopmentActivityEmployee'
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
    academicYear: { type: 'integer', db: 'academic_year' },
    developmentType: { type: 'string', db: 'development_type' },
    productName: { type: 'json', db: 'product_name' },
    additionalInformationDocument: { type: 'string', db: 'additional_information_document' },
    description: { type: 'string', db: 'description' },
    relevantPo: { type: 'string', db: 'relevant_po' },
    facultyInvolved: { type: 'string', db: 'faculty_involved' },
    programId: { type: 'string', db: 'program_id' },
    considerForAccreditation: { type: 'boolean', db: 'consider_for_accreditation' },
    otherPeople: { type: 'string', db: 'other_people' },
    developmentMainId: { type: 'string', db: 'development_main_id' },

    [`${developmentActivityEmployee.tableName}$empIds`]: developmentActivityEmployee.allColumns.empIds,

};

export const schemaRules = yup.object().shape({
    id: yup.string(),
    empId: yup.string().required('required'),
    academicYear: yup.string().required('required'),
    developmentType: yup.string().required('required'),
    productName: yup.string().required('required'),
    additionalInformationDocument: yup.string().notRequired(),
    description: yup.string().required('required'),
    relevantPo: yup.string().required('required'),
    facultyInvolved:yup.mixed().required('required'),
    programId: yup.string().required('required'),
    considerForAccreditation: yup.string().required('required'),
    otherPeople: yup.string().notRequired(),
    developmentMainId: yup.string().required('required'),
    developmentActivityEmployee$empids: yup.mixed().required('required'),
});

export const columns = (settings: any) => {
    const cols: ColumnsType<any> = [
        { dataIndex: 'id', title: 'Sr.No' },
        { dataIndex: 'academicYear', title: 'Academic Year' },
        { dataIndex: 'developmentType', title: 'Development Type' },
        { dataIndex: 'productName', title: 'Product' },
        { dataIndex: 'description', title: 'Description' },
        { dataIndex: 'additionalInformationDocument', title: 'Details of Product' },
        { dataIndex: 'relevantPo', title: 'Relevant PO' },
        { dataIndex: 'considerForAccreditation', title: 'Consider for Accreditation?' },
        { dataIndex: 'otherPeople', title: 'Other People Involved in Activity' },
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
    return JSON.stringify({ employeeDevelopmentActivityDetails: { ...data } });
};
