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

    courseId: { type: 'string', db: 'course_id' },
    degreeLevel: { type: 'string', db: 'degree_level' },
    departmentId: { type: 'string', db: 'department_id' },
    academicYear: { type: 'string', db: 'academic_year' },
    programId: { type: 'string', db: 'program_id' },
    className: { type: 'string', db: 'class_name' },
    division: { type: 'string', db: 'division' },
    semester: { type: 'string', db: 'semester' },
    mainFaculty: { type: 'string', db: 'main_faculty' },
    // is_fy available in schema but not in mock 
    batch: { type: 'string', db: 'batch' },
    practicalType: { type: 'string', db: 'practical_type' },
    tutorialType: { type: 'string', db: 'tutorial_type' },
    projectType: { type: 'string', db: 'project_type' },
    internshipFaculty: { type: 'string', db: 'internship_faculty' },
    selfFaculty: { type: 'string', db: 'self_faculty' },
    theoryHours: { type: 'string', db: 'theory_hours' },
    internshipHours: { type: 'string', db: 'internship_hours' },
    selflearningHours: { type: 'string', db: 'selflearning_hours' },
    courseMethod: { type: 'array', db: 'course_method' },
};
export const alltoolsColumns = {
    id: { type: 'string', db: 'id' },
    version: { type: 'integer', db: 'version' },
    createdAt: { type: 'date', db: 'created_at' },
    createdBy: { type: 'string', db: 'created_by' },
    updatedAt: { type: 'date', db: 'updated_at' },
    updatedBy: { type: 'string', db: 'updated_by' },
    deletedAt: { type: 'date', db: 'deleted_at' },
    deletedBy: { type: 'string', db: 'deleted_by' },
    props: { type: 'json', db: 'props' },

    courseId: { type: 'string', db: 'course_id' },
    toolId: { type: 'string', db: 'tool_id' },
    considerForResult: { type: 'string', db: 'consider_for_result' },
    courseFacultyLinkingId: { type: 'string', db: 'course_faculty_linking_id' },
    courseMethod: { type: 'string', db: 'course_method' },
};
export const alltutorialColumns = {
    id: { type: 'string', db: 'id' },
    version: { type: 'integer', db: 'version' },
    createdAt: { type: 'date', db: 'created_at' },
    createdBy: { type: 'string', db: 'created_by' },
    updatedAt: { type: 'date', db: 'updated_at' },
    updatedBy: { type: 'string', db: 'updated_by' },
    deletedAt: { type: 'date', db: 'deleted_at' },
    deletedBy: { type: 'string', db: 'deleted_by' },
    props: { type: 'json', db: 'props' },

    courseFacultyLinkingId: { type: 'string', db: 'course_faculty_linking_id' },
    tutorialFaculty: { type: 'string', db: 'tutorial_faculty' },
    status: { type: 'string', db: 'status' },
    batchNo: { type: 'string', db: 'batch_no' },
    tutorialHours: { type: 'string', db: 'tutorial_hours' },
};
export const allprojectColumns = {
    id: { type: 'string', db: 'id' },
    version: { type: 'integer', db: 'version' },
    createdAt: { type: 'date', db: 'created_at' },
    createdBy: { type: 'string', db: 'created_by' },
    updatedAt: { type: 'date', db: 'updated_at' },
    updatedBy: { type: 'string', db: 'updated_by' },
    deletedAt: { type: 'date', db: 'deleted_at' },
    deletedBy: { type: 'string', db: 'deleted_by' },
    props: { type: 'json', db: 'props' },

    courseFacultyLinkingId: { type: 'string', db: 'course_faculty_linking_id' },
    projectFaculty: { type: 'string', db: 'project_faculty' },
    status: { type: 'string', db: 'status' },
    batchNo: { type: 'string', db: 'batch_no' },
    projectHours: { type: 'string', db: 'project_hours' },
};
export const allpracticalColumns = {
    id: { type: 'string', db: 'id' },
    version: { type: 'integer', db: 'version' },
    createdAt: { type: 'date', db: 'created_at' },
    createdBy: { type: 'string', db: 'created_by' },
    updatedAt: { type: 'date', db: 'updated_at' },
    updatedBy: { type: 'string', db: 'updated_by' },
    deletedAt: { type: 'date', db: 'deleted_at' },
    deletedBy: { type: 'string', db: 'deleted_by' },
    props: { type: 'json', db: 'props' },

    courseFacultyLinkingId: { type: 'string', db: 'course_faculty_linking_id' },
    practicalFaculty: { type: 'string', db: 'practical_faculty' },
    status: { type: 'string', db: 'status' },
    batchNo: { type: 'string', db: 'batch_no' },
    practicalHours: { type: 'string', db: 'practical_hours' },
};
export const alltheoryColumns = {
    id: { type: 'string', db: 'id' },
    version: { type: 'integer', db: 'version' },
    createdAt: { type: 'date', db: 'created_at' },
    createdBy: { type: 'string', db: 'created_by' },
    updatedAt: { type: 'date', db: 'updated_at' },
    updatedBy: { type: 'string', db: 'updated_by' },
    deletedAt: { type: 'date', db: 'deleted_at' },
    deletedBy: { type: 'string', db: 'deleted_by' },
    props: { type: 'json', db: 'props' },

    courseFacultyLinkingId: { type: 'string', db: 'course_faculty_linking_id' },
    theoryFaculty: { type: 'string', db: 'theory_faculty' },
    status: { type: 'string', db: 'status' },
    batchNo: { type: 'string', db: 'batch_no' },
    theoryHours: { type: 'string', db: 'theory_hours' },
};

export const schemaRules = yup.object().shape({
    academicYear: yup.string().required('required'),
    programId: yup.string().required('required'),
    className: yup.string().required('required'),
    semester: yup.string().required('required'),
    division: yup.string().required('required'),
});

export const columns = (settings: any) => {
    const cols: ColumnsType<any> = [
        {
            dataIndex: 'id', title: 'Sr.No', render(value, record, index) {
                return (index + 1)
            },
        },
        { dataIndex: 'courseId', title: 'Course' },
        { dataIndex: 'practicalType', title: 'Theory Faculty' },//Not Known
        { dataIndex: 'practicalType', title: 'Practical Faculty' },
        { dataIndex: 'tutorialType', title: 'Tutorial Faculty' },
        { dataIndex: 'tutorialType', title: 'Tools For Final Result' }//Not Known
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
    return JSON.stringify({ ManageCourses: { ...data } });
};
