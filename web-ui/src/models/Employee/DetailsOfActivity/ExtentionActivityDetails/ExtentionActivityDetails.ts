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
    studentId: { type: 'string', db: 'emp_id' },
    academicYear: { type: 'string', db: 'academic_year' },
    eventLevel: { type: 'string', db: 'training_program_name' },
    participationType: { type: 'string', db: 'sponsoring_agency' },
    activityName: { type: 'string', db: 'revenue_generated' },
    venuePlaceOfActivity: { type: 'string', db: 'duration' },
    activityDetails: { type: 'string', db: 'consultancy_document' },
    organizingCollaboratingAgency: { type: 'string', db: 'corporate_main_id' },
    otherOrganizingCollaboratingAgencyName: { type: 'string', db: 'number_of_trainees' },
    dateOfEvent: { type: 'date', db: 'date_of_event' },
    achievement: { type: 'string', db: 'achievement' },
    relevantPo: { type: 'string', db: 'relevant_po' },
    relevantCo: { type: 'string', db: 'relevant_co' },
    linkToActivityDocs: { type: 'string', db: 'link_to_activity_docs' },
    activityImageUpload: { type: 'string', db: 'activity_image_upload' },
    document: { type: 'string', db: 'document' }
};

export const schemaRules = yup.object().shape({
    id: yup.string(),
    studentId: yup.string().required('required'),
    academicYear: yup.string().required('required'),
    eventLevel: yup.string().required('required'),
    participationType: yup.string().required('required'),
    activityName: yup.string().required('required'),
    venuePlaceOfActivity: yup.string().required('required'),
    activityDetails: yup.string().required('required'),
    organizingCollaboratingAgency: yup.string().required('required'),
    otherOrganizingCollaboratingAgencyName: yup.string().required('required'),
    dateOfEvent: yup.string().required('required'),
    achievement: yup.string().required('required'),
    relevantPo: yup.string().required('required'),
    relevantCo: yup.string().required('required'),
    linkToActivityDocs: yup.string().required('required'),
    activityImageUpload: yup.string().required('required'),
    document: yup.string().required('required')
});

export const columns = (settings: any) => {
    const cols: ColumnsType<any> = [
        { dataIndex: 'id', title: 'Sr.No' },
        { dataIndex: 'academicYear', title: 'Academic Year' },
        { dataIndex: 'eventLevel', title: 'Event Level' },
        { dataIndex: 'participationType', title: 'Participation Type' },
        { dataIndex: 'participationType', title: 'Country' },
        { dataIndex: 'activityName', title: 'Activity' },
        { dataIndex: 'activityName', title: 'Other Activity' },
        { dataIndex: 'venuePlaceOfActivity', title: 'Venue/Place of Activity' },
        { dataIndex: 'activityDetails', title: 'Details of Activity' },
        { dataIndex: 'organizingCollaboratingAgency', title: 'Organising Unit/Agency/Collaborating Agency' },
        { dataIndex: 'otherOrganizingCollaboratingAgencyName', title: 'Other Organising Unit/Agency/Collaborating Agency' },
        { dataIndex: 'dateOfEvent', title: 'Date' },
        { dataIndex: 'document', title: 'Name of the scheme' },
        { dataIndex: 'document', title: 'Faculty Coordinator/ Participation' },
        { dataIndex: 'document', title: 'Number of Students Participants' },
        { dataIndex: 'achievement', title: 'Achievement/Award' },
        { dataIndex: 'document', title: 'Details' },
        { dataIndex: 'relevantPo', title: 'Relevant PO' },
        { dataIndex: 'relevantCo', title: 'Relevant CO' },
        { dataIndex: 'linkToActivityDocs', title: 'Links to the Image/s of Activity' },
        { dataIndex: 'document', title: 'Document' }
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
    return JSON.stringify({ employeeExtentionActivityDetails: { ...data } });
};
