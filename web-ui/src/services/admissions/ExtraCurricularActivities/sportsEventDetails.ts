import request from '@/utils/request';

export const getAllDetails = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: 'admissions/student_record/extra-curricular/sport/list',
    });
    return resp.data?.records;
  }
  catch (err) {
    console.error(err);
    return err;
  }
};

export const getRecord = async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: `admissions/student_record/extra-curricular/sport/get/${id}`,
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
      url: '/admissions/admit-students/extra-curricular/sport/add',
      data,
    });
    return resp.data?.records;
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
      url: `/admissions/admit-students/extra-curricular/sport/${id}`,
      data,
    });
    return resp.data?.records;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    return err;
  }
};
