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
    qualityOfPaper: { type: 'string', db: 'quality_of_paper' },
    authorName: { type: 'string', db: 'author_name' },
    paperTitle: { type: 'string', db: 'paper_title' },
    conferenceDetails: { type: 'string', db: 'conference_details' },
    publicationDate: { type: 'date', db: 'publication_date' },
    sciImpactFactor: { type: 'string', db: 'sci_impact_factor' },
    certificateDocument: { type: 'string', db: 'certificate_document' },
    considerForAccreditation: { type: 'string', db: 'consider_for_accreditation' },
    financialSupportProvided: { type: 'string', db: 'financial_support_provided' },
    amount: { type: 'string', db: 'amount' },
    conferenceTitle: { type: 'string', db: 'conference_title' },
    linkToJournal: { type: 'string', db: 'link_to_journal' },
    levelOfConference: { type: 'string', db: 'level_of_conference' },
    journalNotified: { type: 'string', db: 'journal_notified' },
    doiNumber: { type: 'string', db: 'doi_number' },
    isbnNumber: { type: 'string', db: 'isbn_number' },
    onlineLink: { type: 'string', db: 'online_link' }
};

export const schemaRules = yup.object().shape({
    id: yup.string(),
    empId: yup.string().required('required'),
    qualityOfPaper: yup.string().required('required'),
    authorName: yup.string().required('required'),
    paperTitle: yup.string().required('required'),
    conferenceDetails: yup.string().required('required'),
    publicationDate: yup.string().required('required'),
    sciImpactFactor: yup.string().notRequired(),
    certificateDocument: yup.string().notRequired(),
    considerForAccreditation: yup.string().required('required'),
    financialSupportProvided: yup.string().notRequired(),
    amount: yup.string().required('required'),
    conferenceTitle: yup.string().notRequired(),
    linkToJournal: yup.string().notRequired(),
    levelOfConference: yup.string().notRequired(),
    journalNotified: yup.string().required('required'),
    doiNumber: yup.string().notRequired(),
    isbnNumber: yup.string().notRequired(),
    onlineLink: yup.string().notRequired()
});

export const columns = (settings: any) => {
    const cols: ColumnsType<any> = [
        { dataIndex: 'id', title: 'Sr.No' },
        { dataIndex: 'authorName', title: 'Author(s)' },
        { dataIndex: 'paperTitle', title: 'Title of Paper' },
        { dataIndex: 'conferenceTitle', title: 'Title of the proceedings of the conference' },
        {
            dataIndex: 'conferenceDetails', title: 'Journal/Conference Details', render(value, record, index) {
                return record.conferenceDetails === '' ? '-' : record.conferenceDetails
            }
        },
        { dataIndex: 'publicationDate', title: 'Date of Publication' },
        { dataIndex: 'journalNotified', title: 'Journal notified on UGC website' },
        { dataIndex: 'isbnNumber', title: 'ISBN/ISSN number' },
        {
            dataIndex: 'doiNumber', title: 'DOI', render(value, record, index) {
                return record.doiNumber === '' ? '-' : record.doiNumber
            }
        },
        { dataIndex: 'sciImpactFactor', title: 'SCI Impact Factor' },
        { dataIndex: 'considerForAccreditation', title: 'Consider for Accreditation?' },
        { dataIndex: 'certificateDocument', title: 'Document' },
        { dataIndex: 'onlineLink', title: 'Online Link' },
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
    return JSON.stringify({ employeePublicationDetails: { ...data } });
};
