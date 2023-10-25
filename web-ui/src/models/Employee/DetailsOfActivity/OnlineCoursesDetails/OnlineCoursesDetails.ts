import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as yup from 'yup';
import { isEmptyValue } from '@/utils/object';
import moment from 'moment';
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
    userId: { type: 'string', db: 'user_id' },
    academicYear: { type: 'string', db: 'academic_year' },
    courseName: { type: 'string', db: 'course_name' },
    courseDuration: { type: 'string', db: 'course_duration' },
    mode: { type: 'string', db: 'mode' },
    startDate: { type: 'date', db: 'start_date' },
    endDate: { type: 'date', db: 'end_date' },
    uploadDocument: { type: 'string', db: 'upload_document' },
    fees: { type: 'string', db: 'fees' },
    organizationName: { type: 'string', db: 'organization_name' },
    relevantPo: { type: 'string', db: 'relevant_po' },
    financialSupport: { type: 'string', db: 'financial_support' },
    program: { type: 'string', db: 'program' },
};

export const schemaRules = yup.object().shape({
    id: yup.string(),
    userId: yup.string().required('required'),
    academicYear: yup.string().required('required'),
    courseName: yup.string().required('required'),
    courseDuration:yup.string().required('required'),
    mode:yup.string().required('required'),
    startDate: yup.string().required('required'),
    organizationName: yup.string().required('required'),
    uploadDocument: yup.string().when(['$formValues', '$settings'], (formValues, settings, schema) => {
        if (!isEmptyValue(formValues.uploadDocument)) {
            return schema.matches(/^[A-Za-z ]*$/, 'Please Upload Document');
        }
        return schema.notRequired();
    }),
    program: yup.string().required('required'),
    relevantPo: yup.string().required('required'),
    endDate: yup.mixed()
    .when(['$formValues', '$settings'], (formValues, settings, schema) => {
      if (!moment(formValues.endDate).isAfter(formValues.startDate)) {
        return schema.test('failed', 'should be greater than start date', (value, { createError }) => {
          return false;
        });
      }
      return schema.notRequired();
    }),
});

export const columns = (settings: any) => {
    const cols: ColumnsType<any> = [
        { dataIndex: 'id', title: 'Sr.No' },
        { dataIndex: 'academicYear', title: 'Academic Year' },
        { dataIndex: 'courseName', title: 'Course Name' },
        { dataIndex: 'courseDuration', title: 'Course Duration (In no.of weeks)' },
        { dataIndex: 'mode', title: 'Mode' },
        { dataIndex: 'startDate', title: 'Start Date' },
        { dataIndex: 'endDate', title: 'End Date' },
        { dataIndex: 'organizationName', title: 'Name of Training Organization' },
        { dataIndex: 'relevantPo', title: 'Relevant PO' },
        { dataIndex: 'fees', title: 'Fees (INR)' },
        { dataIndex: 'financialSupport', title: 'Financial Support' },
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
