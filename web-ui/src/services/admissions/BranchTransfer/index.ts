import request from '@/utils/request';

export const getAllDetails = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: 'admissions/branch-transfer/list',
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
      url: `admissions/branch-transfer/get/${id}`,
    });
    const data = resp?.data?.record;
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
      url: '/admissions/branch-transfer/add',
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
      url: `/admissions/branch-transfer/${id}`,
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

export const getStudents = async () => {
  try {
    const resp: any = await request({
      method: 'get',
      url: 'admissions/branch-transfer/list',
    });

    return resp.data?.students;
  }
  catch (err) {
    console.error(err);
  }
};
