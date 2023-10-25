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
    academicYear: { type: 'string', db: 'academic_year' },
    studentName: { type: 'string', db: 'student_name' },
    degreeType: { type: 'string', db: 'degree_type' },
    thesisTitle: { type: 'string', db: 'thesis_title' },
    registrationYear: { type: 'string', db: 'registration_year' },
    completionYear: { type: 'date', db: 'completion_year' },
    completionStatus: { type: 'string', db: 'completion_status' },
    synopsisDocument: { type: 'string', db: 'synopsis_document' },
    thesisDocument: { type: 'string', db: 'thesis_document' },
    certificateDocument: { type: 'string', db: 'certificate_document' }
};

export const schemaRules = yup.object().shape({
    id: yup.string(),
    empId: yup.string().required('required'),
    academicYear: yup.string().required('required'),
    studentName: yup.string().required('required'),
    degreeType: yup.string().required('required'),
    thesisTitle: yup.string().required('required'),
    registrationYear:yup.string().required('required'),
    completionYear: yup.string().required('required'),
    completionStatus: yup.string().required('required'),
    synopsisDocument: yup.string().when(['$formValues', '$settings'], (formValues, settings, schema) => {
        if (!isEmptyValue(formValues.synopsisDocument)) {
          return schema.matches(/^[A-Za-z ]*$/, 'Please Select Synopsis Document');
        }
        return schema.notRequired();
      }),
    thesisDocument: yup.string().when(['$formValues', '$settings'], (formValues, settings, schema) => {
        if (!isEmptyValue(formValues.thesisDocument)) {
            return schema.matches(/^[A-Za-z ]*$/, 'Please Select Thesis Document');
        }
        return schema.notRequired();
      }),
    certificateDocument: yup.string().when(['$formValues', '$settings'], (formValues, settings, schema) => {
        if (!isEmptyValue(formValues.certificateDocument)) {
            return schema.matches(/^[A-Za-z ]*$/, 'Please Select Certificate Document');
        }
        return schema.notRequired();
      }),
});

export const columns = (settings: any) => {
    const cols: ColumnsType<any> = [
        { dataIndex: 'id', title: 'Sr.No' },
        { dataIndex: 'academicYear', title: 'Academic Year' },
        { dataIndex: 'studentName', title: 'Student Name' },
        { dataIndex: 'degreeType', title: 'Degree Type' },
        {
            dataIndex: 'thesisTitle', title: 'Title of Thesis', render(value, record, index) {
                return record.thesisTitle === '' ? '-' : record.thesisTitle
            }
        },
        { dataIndex: 'registrationYear', title: 'Registration Year' },
        { dataIndex: 'completionYear', title: 'Completion Year' },
        { dataIndex: 'synopsisDocument', title: 'Synopsis' },
        {
            dataIndex: 'thesisDocument', title: 'Project Report', render(value, record, index) {
                return record.thesisDocument === '' ? '-' : record.thesisDocument
            }
        },
        {
            dataIndex: 'certificateDocument', title: 'Document', render(value, record, index) {
                return record.certificateDocument === '' ? '-' : record.certificateDocument
            }
        }
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
    return JSON.stringify({ employeeGuidedStudentDetails: { ...data } });
};
