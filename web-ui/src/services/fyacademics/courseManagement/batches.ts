import request from '@/utils/request';

export const getAllFybatches = async (year: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: '/fyacademics/batches/list',
    });
    const data = resp.data?.records?.filter((batches: any) => batches.academicYear === year);
    return data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const getBatches = async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: `/fyacademics/batches/get/${id}`,
    });
    const data = resp?.data;
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
      url: '/fyacademics/batches/add',
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
      url: `/fyacademics/batches/edit/${id}`,
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
