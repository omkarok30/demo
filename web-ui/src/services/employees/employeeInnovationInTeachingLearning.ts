import request from '@/utils/request';

export const getEmployeeInnovationInTeachingLearnings = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/employee/employee_innovation_in_teaching_learning/list',
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

export const getEmployeeInnovationInTeachingLearning = async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: `/employee/employee_innovation_in_teaching_learning/get/${id}`,
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
      url: '/employee/employee_innovation_in_teaching_learning/add',
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
      url: `/employee/employee_innovation_in_teaching_learning/edit/${id}`,
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
