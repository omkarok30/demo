import _ from 'lodash';
import * as yup from 'yup';
// id|version|created_at|created_by|updated_at|updated_by|deleted_at|deleted_by|props|type|degree_name|degree_code|start_year|end_year|is_disabled|level_of_education|faculty_of_study|
export const tableName = 'user_profile';
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
  password: { type: 'string', db: 'password' },
  userType: { type: 'string', db: 'user_type' },
  firstName: { type: 'string', db: 'first_name' },
  middleName: { type: 'string', db: 'middle_name' },
  lastName: { type: 'string', db: 'last_name' },
  isAvailable: { type: 'string', db: 'is_available' },
  departmentId: { type: 'string', db: 'department_id' },
  direct: { type: 'string', db: 'direct' },
  email: { type: 'string', db: 'email' },
  lastLogin: { type: 'string', db: 'last_login' },
  lastLogout: { type: 'string', db: 'last_logout' },
  faliedLoginCount: { type: 'integer', db: 'falied_login_count' },
  failedLoginAttemptDate: { type: 'datetime', db: 'failed_login_attempt_date' },
  isAdmin: { type: 'string', db: 'is_admin' },
  isAdminInactive: { type: 'string', db: 'is_admin_inactive' },
};

export const schemaRules = yup.object().shape({
  userId: yup.string().required('required'),
});

export const submitJSON = (values: any, modelOnly = true) => {
  const data = {};
  _.each(values, (value, key) => {
    if (modelOnly && _.has(allColumns, key)) {
      _.set(data, [key], value);
    }
  });
  return JSON.stringify({ userDetails: { ...data } });
};
