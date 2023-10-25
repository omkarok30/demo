import request from '@/utils/request';

export const getAllProgramDetails = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/settings/degree-programme/list',
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

export const getProgramDetail = async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: `/settings/degree-programme/get/${id}`,
    });
    const data = resp?.data;
    return data;
  }
  catch (err) {
    console.error(err);
  }
};

export const add = async (data: any) => {
  try {
    const resp = await request({
      method: 'post',
      url: '/settings/degree-programme/add',
      data,
    });
    return resp.data;
  }
  catch (err) {
    console.error(err);
    return err;
  }
};

export const update = async (id: string, data: any) => {
  try {
    const resp = await request({
      method: 'post',
      url: `/settings/degree-programme/edit/${id}`,
      data,
    });
    return resp.data;
  }
  catch (err) {
    console.error(err);
    return err;
  }
};
