import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as yup from 'yup';
import { convertForSubmit } from '@/utils/cast';

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

    criteriaNumber: { type: 'integer', db: 'criteria_number' },
    reviewNumber: { type: 'string', db: 'review_number' },
    academicYear: { type: 'string', db: 'academic_year' },
    userId: { type: 'string', db: 'user_id' },
    selfEvaluationScore: { type: 'string', db: 'self_evaluation_score' },
    reviewerId: { type: 'integer', db: 'reviwer_id' },
    reviewerScore: { type: 'integer', db: 'reviewer_score' },
    comment: { type: 'string', db: 'comment' },
    status: { type: 'string', db: 'status' },
    reviewStatus: { type: 'string', db: 'review_status' },
    makersComment: { type: 'string', db: 'makers_comment' },
    reviewType: { type: 'string', db: 'review_type' },
    reviewDate: { type: 'string', db: 'review_date' },
    assessmentType: { type: 'string', db: 'assessment_type' }
};

export const schemaRules = yup.object().shape({
    criteriaNumber: yup.string(),
    reviewNumber: yup.string(),
    academicYear: yup.string(),
    userId: yup.string(),
    selfEvaluationS: yup.string(),
    reviewerId: yup.string(),
    reviewerScore: yup.string(),
    comment: yup.string(),
    status: yup.string(),
    reviewStatus: yup.string(),
    makersComment: yup.string(),
    reviewType: yup.string(),
    reviewDate: yup.string(),
    assessmentType: yup.string()
});

export const columns = (settings: any) => {
    const cols: ColumnsType<any> = [
        { dataIndex: 'id', title: 'Sr. No.' },
        { dataIndex: 'reviewDate', title: 'Date of Review' },
        { dataIndex: 'reviewerId', title: 'Name of the Reviewer' },
        { dataIndex: 'reviewerScore', title: 'Rating' },
        { dataIndex: 'comment', title: "Reviewer's Remark/Comments" },
        { dataIndex: 'status', title: "Status" }
    ];
    return cols;
};

export const submitJSON = (values: any, modelOnly = true) => {
    let data = {};
    _.each(values, (value, key) => {
        if (modelOnly && _.has(allColumns, key)) {
            _.set(data, [key], value);
        }
    });
    data = convertForSubmit(data, allColumns);
    return JSON.stringify({ review: { ...data } });
};