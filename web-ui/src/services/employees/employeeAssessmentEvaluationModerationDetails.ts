import request from '@/utils/request';

export const getEmployeeAssessmentEvaluations = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/employee/employee_assessment_evaluation_moderation/list',
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

export const getEmployeeAssessmentEvaluation = async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: `/employee/employee_assessment_evaluation_moderation/get/${id}`,
    });
    const data = resp?.data?.records;
    return data;
  }
  catch (err) {
    console.error(err);
    throw err;
  }
};

export const add = async (data: any) => {
  try {
    const resp = await request({
      method: 'post',
      url: '/employee/employee_assessment_evaluation_moderation/add',
      data,
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const update = async (id: string, data: any) => {
  try {
    const resp = await request({
      method: 'post',
      url: `/employee/employee_assessment_evaluation_moderation/edit/${id}`,
      data,
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};
