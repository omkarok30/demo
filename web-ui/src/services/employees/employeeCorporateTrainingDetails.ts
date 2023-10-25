import request from '@/utils/request';

export const getEmployeeCorporateTrainingDetails = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/employee/employee_corporate_training_details/list',
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

export const getEmployeeCorporateTrainingDetail = async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: `/employee/employee_corporate_training_details/get/${id}`,
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
      url: '/employee/employee_corporate_training_details/add',
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
      url: `/employee/employee_corporate_training_details/edit/${id}`,
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
