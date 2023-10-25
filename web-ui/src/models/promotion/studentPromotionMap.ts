import _ from 'lodash';

import { convertForSubmit } from '@/utils/cast';

export const tableName = 'student_promotion_map';
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
  studId: { type: 'string', db: 'stud_id' },
  class: { type: 'string', db: 'class' },
  academicYear: { type: 'integer', db: 'academic_year' },
  sem1Status: { type: 'integer', db: 'sem1_status' },
  sem2Status: { type: 'integer', db: 'sem2_status' },
  overall_marks: { type: 'string', db: 'overall_marks' },
  overall_marks_cgpa: { type: 'string', db: 'overall_marks_cgpa' },
  overall_status: { type: 'string', db: 'overall_status' },
  isRegular: { type: 'string', db: 'isRegular' },
  freeze: { type: 'string', db: 'freeze' },
  sem1Marks: { type: 'string', db: 'sem1_marks' },
  sem1MarksSgpa: { type: 'string', db: 'sem1_marks_sgpa' },
  sem1MarksCgpa: { type: 'string', db: 'sem1_marks_cgpa' },
  sem2Marks: { type: 'string', db: 'sem2_marks' },
  sem2MarksSgpa: { type: 'string', db: 'sem2_marks_sgpa' },
  pId: { type: 'string', db: 'p_id' },
  isAdmitted: { type: 'string', db: 'isAdmitted' },
  remarks: { type: 'string', db: 'remarks' },
  admission_date: { type: 'string', db: 'admission_date' },
  gap_reason: { type: 'string', db: 'gap_reason' },
  per_isAdmitted: { type: 'string', db: 'per_isAdmitted' },
  admit_sem1: { type: 'string', db: 'admit_sem1' },
  admit_sem2: { type: 'string', db: 'admit_sem2' },

};

export const submitJSON = (values: any, modelOnly = true) => {
  let data = {};
  _.each(values, (value, key) => {
    if (modelOnly && _.has(allColumns, key)) {
      _.set(data, [key], value);
    }
  });
  data = convertForSubmit(data, allColumns);
  return JSON.stringify({ promotiondetails: { ...data } });
};
